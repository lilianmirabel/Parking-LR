import { Parking, ParkingListResponse } from "@/app/types/parking";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export class ParkingServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "ParkingServiceError";
  }
}

export async function getAllParkings(): Promise<Parking[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/parkings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ParkingServiceError(
        errorData.message || "Erreur lors de la récupération des parkings",
        "fetch_failed",
        response.status
      );
    }

    const result: ParkingListResponse = await response.json();
    return result.data || [];
  } catch (error) {
    if (error instanceof ParkingServiceError) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ParkingServiceError(
        "Impossible de contacter le serveur. Vérifiez votre connexion.",
        "network_error"
      );
    }

    throw new ParkingServiceError(
      "Une erreur inattendue s'est produite",
      "unknown_error"
    );
  }
}