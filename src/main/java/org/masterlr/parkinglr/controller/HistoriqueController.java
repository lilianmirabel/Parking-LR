package org.masterlr.parkinglr.controller;

import org.masterlr.parkinglr.dto.ParkingHistoriqueDTO;
import org.masterlr.parkinglr.entity.Donnees;
import org.masterlr.parkinglr.entity.Parking;
import org.masterlr.parkinglr.repository.DonneesRepository;
import org.masterlr.parkinglr.repository.ParkingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/historique")
@CrossOrigin(origins = "*")
public class HistoriqueController {

    private final DonneesRepository donneesRepository;
    private final ParkingRepository parkingRepository;

    public HistoriqueController(DonneesRepository donneesRepository, ParkingRepository parkingRepository) {
        this.donneesRepository = donneesRepository;
        this.parkingRepository = parkingRepository;
    }

    @GetMapping("/dates")
    public ResponseEntity<Map<String, Object>> getDatesDisponibles() {
        try {
            List<String> dates = donneesRepository.findDistinctDates();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", dates);
            response.put("count", dates.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur lors de la récupération des dates: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/parkings")
    public ResponseEntity<Map<String, Object>> getParkingsParDate(
            @RequestParam(required = false) String date) {
        try {
            List<ParkingHistoriqueDTO> parkingsDTO = new ArrayList<>();
            
            if (date != null && !date.isEmpty()) {
                // Récupérer les données historiques pour une date spécifique
                LocalDate localDate = LocalDate.parse(date);
                LocalDateTime startDate = localDate.atStartOfDay();
                LocalDateTime endDate = localDate.atTime(LocalTime.MAX);
                
                List<Donnees> donnees = donneesRepository.findByDateComptageRange(startDate, endDate);
                
                for (Donnees d : donnees) {
                    Parking p = d.getParking();
                    ParkingHistoriqueDTO dto = new ParkingHistoriqueDTO();
                    dto.setId(p.getId().toString());
                    dto.setNom(p.getNom());
                    dto.setYlat(p.getYlat());
                    dto.setXlong(p.getXlong());
                    dto.setCoordX(p.getCoordX());
                    dto.setCoordY(p.getCoordY());
                    dto.setNbPlaces(p.getNbPlaces());
                    dto.setNbPlacesDisponibles(d.getNbPlacesDisponible());
                    dto.setNbPr(p.getNbPr());
                    dto.setNbPmr(p.getNbPmr());
                    dto.setNbVoituresElectriques(p.getNbVoituresElectriques());
                    dto.setNbVelo(p.getNbVelo());
                    dto.setNb2rEl(p.getNb2rEl());
                    dto.setNbAutopartage(p.getNbAutopartage());
                    dto.setNb2Rm(p.getNb2Rm());
                    dto.setDateComptage(d.getDateComptage());
                    parkingsDTO.add(dto);
                }
            } else {
                // Retourner les données actuelles (comme avant)
                List<Parking> parkings = parkingRepository.findAll();
                for (Parking p : parkings) {
                    ParkingHistoriqueDTO dto = new ParkingHistoriqueDTO();
                    dto.setId(p.getId().toString());
                    dto.setNom(p.getNom());
                    dto.setYlat(p.getYlat());
                    dto.setXlong(p.getXlong());
                    dto.setCoordX(p.getCoordX());
                    dto.setCoordY(p.getCoordY());
                    dto.setNbPlaces(p.getNbPlaces());
                    dto.setNbPlacesDisponibles(p.getNbPlacesDisponibles());
                    dto.setNbPr(p.getNbPr());
                    dto.setNbPmr(p.getNbPmr());
                    dto.setNbVoituresElectriques(p.getNbVoituresElectriques());
                    dto.setNbVelo(p.getNbVelo());
                    dto.setNb2rEl(p.getNb2rEl());
                    dto.setNbAutopartage(p.getNbAutopartage());
                    dto.setNb2Rm(p.getNb2Rm());
                    parkingsDTO.add(dto);
                }
            }

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", parkingsDTO);
            response.put("count", parkingsDTO.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Erreur lors de la récupération des parkings: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}
