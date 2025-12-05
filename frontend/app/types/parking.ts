export interface Parking {
  id: string;
  nom: string;
  ylat: number;
  xlong: number;
  coordX: number;
  coordY: number;
  nbPlaces: number | null;
  nbPlacesDisponibles: number | null;
  nbPr: number | null;
  nbPmr: number | null;
  nbVoituresElectriques: number | null;
  nbVelo: number | null;
  nb2rEl: number | null;
  nbAutopartage: number | null;
  nb2Rm: number | null;
}

export interface ParkingListResponse {
  success: boolean;
  message: string;
  count: number;
  data: Parking[];
}
