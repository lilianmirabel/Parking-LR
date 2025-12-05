import { Parking, ParkingListResponse } from "@/app/types/parking";

export class LiveServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "LiveServiceError";
  }
}

export async function getLiveParkings(): Promise<Parking[]> {
  try {
    const response = await fetch("/api/live-parkings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new LiveServiceError(
        errorData.error || "Erreur lors de la recuperation des donnees en direct",
        "fetch_failed",
        response.status
      );
    }

    const result: ParkingListResponse = await response.json();
    return result.data || [];
  } catch (error) {
    if (error instanceof LiveServiceError) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new LiveServiceError(
        "Impossible de contacter le serveur. Verifiez votre connexion.",
        "network_error"
      );
    }

    throw new LiveServiceError(
      "Une erreur inattendue s'est produite",
      "unknown_error"
    );
  }
}