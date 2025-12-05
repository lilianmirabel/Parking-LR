import { NextResponse } from "next/server";
import { Parking } from "@/app/types/parking";

const LIVE_API_URL =
  "https://opendata.agglo-larochelle.fr/d4c/api/records/1.0/search/dataset=parking___places_disponibles_en_temps_reel&resource_id=c42ead3c-828b-4bbc-9c44-fb26ec5968d1&facet=id";

interface ApiRecord {
  id: string;
  nom: string;
  ylat: number;
  xlong: number;
  coord_x: number;
  coord_y: number;
  nb_places: number | null;
  nb_places_disponibles: number | null;
  nb_pr: number | null;
  nb_pmr: number | null;
  nb_voitures_electriques: number | null;
  nb_velo: number | null;
  nb_2r_el: number | null;
  nb_autopartage: number | null;
  nb_2_rm: number | null;
}

interface ApiResponse {
  nhits: number;
  records: Array<{
    fields: ApiRecord;
  }>;
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return parseFloat(value) || 0;
  return 0;
}

function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? null : parsed;
  }
  return null;
}

function transformRecord(record: ApiRecord): Parking {
  return {
    id: String(record.id),
    nom: String(record.nom),
    ylat: toNumber(record.ylat),
    xlong: toNumber(record.xlong),
    coordX: toNumber(record.coord_x),
    coordY: toNumber(record.coord_y),
    nbPlaces: toNumberOrNull(record.nb_places),
    nbPlacesDisponibles: toNumberOrNull(record.nb_places_disponibles),
    nbPr: toNumberOrNull(record.nb_pr),
    nbPmr: toNumberOrNull(record.nb_pmr),
    nbVoituresElectriques: toNumberOrNull(record.nb_voitures_electriques),
    nbVelo: toNumberOrNull(record.nb_velo),
    nb2rEl: toNumberOrNull(record.nb_2r_el),
    nbAutopartage: toNumberOrNull(record.nb_autopartage),
    nb2Rm: toNumberOrNull(record.nb_2_rm),
  };
}

export async function GET() {
  try {
    const response = await fetch(LIVE_API_URL, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch live data", status: response.status },
        { status: response.status }
      );
    }

    const data: ApiResponse = await response.json();

    const parkings: Parking[] = data.records
      .filter((record) => record.fields && record.fields.nom)
      .map((record) => transformRecord(record.fields));

    return NextResponse.json({
      success: true,
      count: parkings.length,
      data: parkings,
    });
  } catch (error) {
    console.error("Error fetching live parking data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}