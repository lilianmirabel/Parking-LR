export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface CsvFile {
  name: string;
  size: number;
  file: File;
}

export interface UploadState {
  file: CsvFile | null;
  status: UploadStatus;
  error: string | null;
  progress: number;
}

export interface UploadResult {
  success: boolean;
  message: string;
  data?: ParkingData[];
}

export interface CsvValidationError {
  type: "invalid_type" | "file_too_large" | "empty_file";
  message: string;
}

export const CSV_CONFIG = {
  maxFileSizeMB: 10,
  acceptedTypes: [".csv", "text/csv"],
} as const;

// =============================================================================
// TODO [BACKEND]: Structure des données Parking
// -----------------------------------------------------------------------------
// Cette interface correspond à DataParser.java
// Le backend doit retourner les données dans ce format JSON
// =============================================================================
export interface ParkingData {
  id: number;
  nom: string;
  ylat: number;               // Latitude
  xlong: number;              // Longitude
  coordX: number;
  coordY: number;
  dateComptage: string;       // Format ISO: "2024-01-15T10:30:00"

  // Capacité globale
  nbPlaces: number;
  nbPlacesDisponibles: number;

  // Park & Ride
  nbPr: number;
  nbPrDispo: number;

  // Personnes à Mobilité Réduite
  nbPmr: number;
  nbPmrDispo: number;

  // Voitures électriques
  nbVoituresElectriques: number;
  nbVoituresElectriquesDispo: number;

  // Vélos
  nbVelo: number;
  nbVeloDispo: number;

  // 2 roues électriques
  nb2rEl: number;
  nb2rElDispo: number;

  // Autopartage
  nbAutopartage: number;
  nbAutopartageDispo: number;

  // 2 roues motorisés
  nb2Rm: number;
  nb2RmDispo: number;
}