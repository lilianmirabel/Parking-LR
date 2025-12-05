"use client";

import { useParkings } from "@/app/hooks/useParkings";
import ParkingCard from "./ParkingCard";

export default function ParkingList() {
  const { parkings, isLoading, isError, isEmpty, error, refresh } = useParkings();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="p-4 bg-blue-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-blue-600 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <p className="text-slate-600 font-medium">Chargement des parkings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="p-4 bg-red-100 rounded-full mb-4">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <p className="text-red-600 font-medium mb-4">{error}</p>
        <button
          onClick={refresh}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
        >
          Reessayer
        </button>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="p-4 bg-slate-100 rounded-full mb-4">
          <svg
            className="w-10 h-10 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <p className="text-slate-700 font-medium mb-2">Aucun parking trouve</p>
        <p className="text-sm text-slate-500">
          Importez un fichier CSV pour ajouter des parkings
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Liste des parkings
            </h2>
            <p className="text-sm text-slate-500">
              {parkings.length} parking{parkings.length > 1 ? "s" : ""} disponible{parkings.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-white"
          title="Rafraichir la liste"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Rafraichir
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {parkings.map((parking) => (
          <ParkingCard key={parking.id} parking={parking} />
        ))}
      </div>
    </div>
  );
}