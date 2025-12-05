package org.masterlr.parkinglr.controller;

import org.masterlr.parkinglr.entity.Enregistrement;
import org.masterlr.parkinglr.entity.Parking;
import org.masterlr.parkinglr.repository.EnregistrementRepository;
import org.masterlr.parkinglr.repository.ParkingRepository;
import org.masterlr.parkinglr.service.CsvParserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api")
public class CsvController {

    private final CsvParserService csvParserService;
    private final ParkingRepository parkingRepository;
    private final EnregistrementRepository enregistrementRepository;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    public CsvController(CsvParserService csvParserService,
                         ParkingRepository parkingRepository,
                         EnregistrementRepository enregistrementRepository) {
        this.csvParserService = csvParserService;
        this.parkingRepository = parkingRepository;
        this.enregistrementRepository = enregistrementRepository;
    }

    /**
     * Upload and parse a CSV file
     */
    @PostMapping("/upload-csv")
    @Transactional
    public ResponseEntity<?> uploadCsv(@RequestParam("file") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();

        // Validate file
        if (file.isEmpty()) {
            response.put("success", false);
            response.put("message", "Aucun fichier fourni");
            return ResponseEntity.badRequest().body(response);
        }

        String filename = file.getOriginalFilename();
        if (filename == null || !filename.toLowerCase().endsWith(".csv")) {
            response.put("success", false);
            response.put("message", "Le fichier doit être au format CSV");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // Parse CSV BEFORE saving to disk (MultipartFile input stream can only be read once)
            CsvParserService.ParseResult parseResult = csvParserService.parseCombinedCsv(file);

            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save file with timestamp to avoid collisions
            String savedFilename = System.currentTimeMillis() + "_" + filename;
            Path filePath = uploadPath.resolve(savedFilename);
            Files.write(filePath, file.getBytes());

            // Upsert parkings: update existing ones or create new ones
            List<Parking> savedParkings = new ArrayList<>();
            int parkingsCreated = 0;
            int parkingsUpdated = 0;

            for (Parking parsedParking : parseResult.parkings) {
                Optional<Parking> existingParking = parkingRepository.findByNom(parsedParking.getNom());

                if (existingParking.isPresent()) {
                    // Update existing parking with new values
                    Parking existing = existingParking.get();
                    existing.setYlat(parsedParking.getYlat());
                    existing.setXlong(parsedParking.getXlong());
                    existing.setCoordX(parsedParking.getCoordX());
                    existing.setCoordY(parsedParking.getCoordY());
                    existing.setNbPlaces(parsedParking.getNbPlaces());
                    existing.setNbPlacesDisponibles(parsedParking.getNbPlacesDisponibles());
                    existing.setNbPr(parsedParking.getNbPr());
                    existing.setNbPmr(parsedParking.getNbPmr());
                    existing.setNbVoituresElectriques(parsedParking.getNbVoituresElectriques());
                    existing.setNbVelo(parsedParking.getNbVelo());
                    existing.setNb2rEl(parsedParking.getNb2rEl());
                    existing.setNbAutopartage(parsedParking.getNbAutopartage());
                    existing.setNb2Rm(parsedParking.getNb2Rm());
                    // Delete old enregistrements before adding new ones
                    enregistrementRepository.deleteByParkingId(existing.getId());
                    savedParkings.add(parkingRepository.save(existing));
                    parkingsUpdated++;
                } else {
                    // Create new parking
                    savedParkings.add(parkingRepository.save(parsedParking));
                    parkingsCreated++;
                }
            }

            // Build a map from original parking object to CSV id
            Map<Parking, String> parkingToCsvId = new HashMap<>();
            int idx = 0;
            List<String> csvIds = new ArrayList<>(parseResult.enregistrementsPerParking.keySet());
            for (Parking p : parseResult.parkings) {
                if (idx < csvIds.size()) {
                    parkingToCsvId.put(p, csvIds.get(idx));
                }
                idx++;
            }

            // Create enregistrements with the parking UUIDs
            List<Enregistrement> enregistrements = new ArrayList<>();
            for (int i = 0; i < parseResult.parkings.size(); i++) {
                Parking originalParking = parseResult.parkings.get(i);
                Parking savedParking = savedParkings.get(i);
                String csvId = parkingToCsvId.get(originalParking);

                if (csvId != null && parseResult.enregistrementsPerParking.containsKey(csvId)) {
                    for (CsvParserService.EnregistrementData data : parseResult.enregistrementsPerParking.get(csvId)) {
                        Enregistrement e = csvParserService.toEnregistrement(data, savedParking.getId());
                        enregistrements.add(e);
                    }
                }
            }

            // Save all enregistrements
            enregistrementRepository.saveAll(enregistrements);

            response.put("success", true);
            response.put("message", "Fichier importé avec succès");
            response.put("filename", savedFilename);
            response.put("parkingsCreated", parkingsCreated);
            response.put("parkingsUpdated", parkingsUpdated);
            response.put("recordsImported", enregistrements.size());
            response.put("data", savedParkings);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erreur lors du traitement du fichier: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * List all uploaded CSV files
     */
    @GetMapping("/files")
    public ResponseEntity<?> listFiles() {
        Map<String, Object> response = new HashMap<>();

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                response.put("success", true);
                response.put("files", List.of());
                return ResponseEntity.ok(response);
            }

            List<Map<String, Object>> files;
            try (Stream<Path> pathStream = Files.list(uploadPath)) {
                files = pathStream
                        .filter(path -> path.toString().endsWith(".csv"))
                        .map(path -> {
                            Map<String, Object> fileInfo = new HashMap<>();
                            File f = path.toFile();
                            fileInfo.put("name", f.getName());
                            fileInfo.put("size", f.length());
                            fileInfo.put("lastModified", f.lastModified());
                            return fileInfo;
                        })
                        .collect(Collectors.toList());
            }

            response.put("success", true);
            response.put("files", files);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            response.put("success", false);
            response.put("message", "Erreur lors de la lecture des fichiers");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Delete a CSV file
     */
    @DeleteMapping("/files/{filename}")
    public ResponseEntity<?> deleteFile(@PathVariable String filename) {
        Map<String, Object> response = new HashMap<>();

        try {
            Path filePath = Paths.get(uploadDir, filename);

            if (!Files.exists(filePath)) {
                response.put("success", false);
                response.put("message", "Fichier non trouvé");
                return ResponseEntity.notFound().build();
            }

            Files.delete(filePath);

            response.put("success", true);
            response.put("message", "Fichier supprimé avec succès");
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            response.put("success", false);
            response.put("message", "Erreur lors de la suppression du fichier");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    /**
     * Get all parking data
     */
    @GetMapping("/parkings")
    public ResponseEntity<?> getAllParkings() {
        Map<String, Object> response = new HashMap<>();
        List<Parking> parkings = parkingRepository.findAll();

        response.put("success", true);
        response.put("data", parkings);
        response.put("count", parkings.size());

        return ResponseEntity.ok(response);
    }
}