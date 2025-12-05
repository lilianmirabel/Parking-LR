export interface Parking {
  id: string;
  nom: string;
  ylat: number;
  xlong: number;
  coordX: number;
  coordY: number;
  nbPlaces: number;
  nbPr: number;
  nbPmr: number;
  nbVoituresElectriques: number;
  nbVelo: number;
  nb2rEl: number;
  nbAutopartage: number;
  nb2Rm: number;
}

export interface ParkingListResponse {
  success: boolean;
  message: string;
  count: number;
  data: Parking[];
}