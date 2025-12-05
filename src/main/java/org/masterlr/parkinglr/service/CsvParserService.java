package org.masterlr.parkinglr.service;

import org.masterlr.parkinglr.entity.Enregistrement;
import org.masterlr.parkinglr.entity.Parking;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CsvParserService {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    /**
     * Result class containing both parkings and their availability records
     */
    public static class ParseResult {
        public List<Parking> parkings;
        public Map<String, List<EnregistrementData>> enregistrementsPerParking; // CSV id -> list of availability data

        public ParseResult() {
            this.parkings = new ArrayList<>();
            this.enregistrementsPerParking = new HashMap<>();
        }
    }

    /**
     * Temporary holder for enregistrement data before we have the real parking UUID
     */
    public static class EnregistrementData {
        public LocalDateTime dateComptage;
        public int nbPlacesDisponibles;
        public int nbPrDispo;
        public int nbPmrDispo;
        public int nbVoituresElectriquesDispo;
        public int nbVeloDispo;
        public int nb2rElDispo;
        public int nbAutopartageDispo;
        public int nb2RmDispo;
    }

    /**
     * Parse CSV file containing combined parking and availability data
     * CSV format: id,nom,ylat,xlong,coord_x,coord_y,date_comptage,nb_places,nb_places_disponibles,
     *             nb_pr,nb_pr_dispo,nb_pmr,nb_pmr_dispo,nb_voitures_electriques,nb_voitures_electriques_dispo,
     *             nb_velo,nb_velo_dispo,nb_2r_el,nb_2r_el_dispo,nb_autopartage,nb_autopartage_dispo,
     *             nb_2_rm,nb_2_rm_dispo
     */
    public ParseResult parseCombinedCsv(MultipartFile file) throws Exception {
        ParseResult result = new ParseResult();
        Map<String, Parking> parkingMap = new HashMap<>(); // CSV id -> Parking object

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean isFirstLine = true;

            while ((line = reader.readLine()) != null) {
                // Skip header line
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                // Skip empty lines
                if (line.trim().isEmpty()) {
                    continue;
                }

                String[] values = line.split(",");
                if (values.length < 23) {
                    continue; // Skip malformed lines
                }

                String csvId = values[0].trim();

                // Check if we already have this parking
                if (!parkingMap.containsKey(csvId)) {
                    // Create new parking (without setting ID - let DB generate it)
                    Parking parking = new Parking();
                    parking.setNom(values[1].trim());
                    parking.setYlat(parseDoubleSafe(values[2]));
                    parking.setXlong(parseDoubleSafe(values[3]));
                    parking.setCoordX(parseDoubleSafe(values[4]));
                    parking.setCoordY(parseDoubleSafe(values[5]));
                    parking.setNbPlaces(parseIntSafe(values[7]));
                    parking.setNbPr(parseIntSafe(values[9]));
                    parking.setNbPmr(parseIntSafe(values[11]));
                    parking.setNbVoituresElectriques(parseIntSafe(values[13]));
                    parking.setNbVelo(parseIntSafe(values[15]));
                    parking.setNb2rEl(parseIntSafe(values[17]));
                    parking.setNbAutopartage(parseIntSafe(values[19]));
                    parking.setNb2Rm(parseIntSafe(values[21]));

                    parkingMap.put(csvId, parking);
                    result.parkings.add(parking);
                    result.enregistrementsPerParking.put(csvId, new ArrayList<>());
                }

                // Create enregistrement data for each line
                EnregistrementData data = new EnregistrementData();
                data.dateComptage = parseDateTimeSafe(values[6]);
                data.nbPlacesDisponibles = parseIntSafe(values[8]);
                data.nbPrDispo = parseIntSafe(values[10]);
                data.nbPmrDispo = parseIntSafe(values[12]);
                data.nbVoituresElectriquesDispo = parseIntSafe(values[14]);
                data.nbVeloDispo = parseIntSafe(values[16]);
                data.nb2rElDispo = parseIntSafe(values[18]);
                data.nbAutopartageDispo = parseIntSafe(values[20]);
                data.nb2RmDispo = parseIntSafe(values[22]);

                result.enregistrementsPerParking.get(csvId).add(data);
            }
        }

        return result;
    }

    /**
     * Convert EnregistrementData to Enregistrement entity with the real parking UUID
     */
    public Enregistrement toEnregistrement(EnregistrementData data, java.util.UUID parkingId) {
        Enregistrement e = new Enregistrement();
        e.setParkingId(parkingId);
        e.setDateComptage(data.dateComptage);
        e.setNbPlacesDisponibles(data.nbPlacesDisponibles);
        e.setNbPrDispo(data.nbPrDispo);
        e.setNbPmrDispo(data.nbPmrDispo);
        e.setNbVoituresElectriquesDispo(data.nbVoituresElectriquesDispo);
        e.setNbVeloDispo(data.nbVeloDispo);
        e.setNb2rElDispo(data.nb2rElDispo);
        e.setNbAutopartageDispo(data.nbAutopartageDispo);
        e.setNb2RmDispo(data.nb2RmDispo);
        return e;
    }

    private int parseIntSafe(String value) {
        try {
            return Integer.parseInt(value.trim());
        } catch (NumberFormatException e) {
            return 0;
        }
    }

    private double parseDoubleSafe(String value) {
        try {
            return Double.parseDouble(value.trim());
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }

    private LocalDateTime parseDateTimeSafe(String value) {
        try {
            return LocalDateTime.parse(value.trim(), DATE_FORMATTER);
        } catch (Exception e) {
            return LocalDateTime.now();
        }
    }
}