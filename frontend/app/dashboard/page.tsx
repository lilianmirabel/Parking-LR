"use client";

import Link from "next/link";
import { useParkings } from "@/app/hooks/useParkings";
import DashboardKPIs from "@/app/components/dashboard/DashboardKPIs";

export default function DashboardPage() {
  const { parkings, isLoading, error } = useParkings();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md">
          <h2 className="text-red-800 font-bold text-lg mb-2">Erreur</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            📊 Dashboard Analytique
          </h1>
          <p className="text-slate-600">
            Visualisation des données et statistiques des parkings
          </p>
        </div>

        {/* KPIs et Graphiques */}
        {parkings.length > 0 ? (
          <DashboardKPIs parkings={parkings} />
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-200">
            <svg
              className="w-24 h-24 mx-auto text-slate-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Aucune donnée disponible
            </h3>
            <p className="text-slate-600 mb-6">
              Importez des données de parkings pour voir les statistiques
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Importer des données
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
