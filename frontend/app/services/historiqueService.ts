// Utilise l'URL appropriée selon le contexte (serveur ou client)
const getApiUrl = () => {
  // Côté serveur (SSR), utilise le nom du service Docker
  if (typeof window === "undefined") {
    return "http://app:8080/api";
  }
  // Côté client, utilise localhost avec le chemin /api
  // Valeur par défaut hardcodée car les variables NEXT_PUBLIC_ ne sont pas toujours disponibles en dev
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
  console.log("DEBUG - Full baseUrl:", baseUrl);
  return baseUrl;
};

export interface DateDisponible {
  date: string;
}

export const historiqueService = {
  async getDatesDisponibles(): Promise<string[]> {
    const API_URL = getApiUrl();
    console.log("DEBUG - API_URL base:", API_URL);
    console.log("DEBUG - NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
    console.log("Fetching dates from:", `${API_URL}/historique/dates`);
    const response = await fetch(`${API_URL}/historique/dates`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des dates");
    }
    const data = await response.json();
    return data.data || [];
  },

  async getParkingsParDate(date?: string) {
    const API_URL = getApiUrl();
    const url = date
      ? `${API_URL}/historique/parkings?date=${date}`
      : `${API_URL}/historique/parkings`;

    console.log("DEBUG - API_URL base:", API_URL);
    console.log("Fetching parkings from:", url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des parkings");
    }
    const data = await response.json();
    return data.data || [];
  },
};
