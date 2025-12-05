import { UploadResult, CSV_CONFIG, CsvValidationError } from "@/app/types/csv";

// =============================================================================
// TODO [BACKEND]: Configuration de l'URL de l'API
// -----------------------------------------------------------------------------
// 1. Créer un fichier .env.local à la racine de /frontend avec:
//    NEXT_PUBLIC_API_URL=http://localhost:8080
//
// 2. En production, configurer cette variable d'environnement sur le serveur
// =============================================================================
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export class CsvServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "CsvServiceError";
  }
}

export function validateCsvFile(file: File): CsvValidationError | null {
  // Check file type
  const isValidType =
    file.type === "text/csv" ||
    file.name.toLowerCase().endsWith(".csv");

  if (!isValidType) {
    return {
      type: "invalid_type",
      message: "Le fichier doit être au format CSV",
    };
  }

  // Check file size
  const maxSizeBytes = CSV_CONFIG.maxFileSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      type: "file_too_large",
      message: `Le fichier ne doit pas dépasser ${CSV_CONFIG.maxFileSizeMB} Mo`,
    };
  }

  // Check if file is empty
  if (file.size === 0) {
    return {
      type: "empty_file",
      message: "Le fichier est vide",
    };
  }

  return null;
}

export async function uploadCsv(
  file: File,
  onProgress?: (progress: number) => void
): Promise<UploadResult> {
  // Validate file before upload
  const validationError = validateCsvFile(file);
  if (validationError) {
    throw new CsvServiceError(
      validationError.message,
      validationError.type
    );
  }

  const formData = new FormData();
  formData.append("file", file);

  // ===========================================================================
  // TODO [BACKEND]: Endpoint à créer côté Java Spring Boot
  // ---------------------------------------------------------------------------
  // Créer un controller: CsvController.java
  //
  // @RestController
  // @RequestMapping("/api")
  // public class CsvController {
  //
  //     @PostMapping("/upload-csv")
  //     public ResponseEntity<?> uploadCsv(@RequestParam("file") MultipartFile file) {
  //         // Parser le CSV et retourner les données
  //         // Utiliser DataParser pour mapper les lignes
  //     }
  // }
  //
  // Format de réponse attendu (JSON):
  // - Succès: { "success": true, "message": "...", "data": [...] }
  // - Erreur: { "success": false, "message": "Description de l'erreur" }
  //
  // N'oubliez pas d'activer CORS pour http://localhost:3000
  // ===========================================================================
  try {
    const response = await fetch(`${API_BASE_URL}/api/upload-csv`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new CsvServiceError(
        errorData.message || "Erreur lors de l'envoi du fichier",
        "upload_failed",
        response.status
      );
    }

    // TODO [BACKEND]: Implémenter le vrai progress avec XMLHttpRequest si nécessaire
    onProgress?.(100);

    const data = await response.json();
    return {
      success: true,
      message: "Fichier importé avec succès",
      data,
    };
  } catch (error) {
    if (error instanceof CsvServiceError) {
      throw error;
    }

    // Network error
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new CsvServiceError(
        "Impossible de contacter le serveur. Vérifiez votre connexion.",
        "network_error"
      );
    }

    throw new CsvServiceError(
      "Une erreur inattendue s'est produite",
      "unknown_error"
    );
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}