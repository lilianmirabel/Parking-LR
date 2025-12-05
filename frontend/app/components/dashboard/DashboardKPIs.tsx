"use client";

import { Parking } from "@/app/types/parking";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DashboardKPIsProps {
  parkings: Parking[];
}

export default function DashboardKPIs({ parkings }: DashboardKPIsProps) {
  // Calculs des KPIs globaux
  const totalPlaces = parkings.reduce((sum, p) => sum + (p.nbPlaces ?? 0), 0);
  const totalDisponibles = parkings.reduce(
    (sum, p) => sum + (p.nbPlacesDisponibles ?? 0),
    0
  );
  const totalOccupees = totalPlaces - totalDisponibles;
  const tauxOccupation =
    totalPlaces > 0 ? ((totalOccupees / totalPlaces) * 100).toFixed(1) : 0;

  // Parkings les plus occupés
  const parkingsOccupation = parkings
    .map((p) => ({
      nom: p.nom,
      occupees: (p.nbPlaces ?? 0) - (p.nbPlacesDisponibles ?? 0),
      disponibles: p.nbPlacesDisponibles ?? 0,
      total: p.nbPlaces ?? 0,
      tauxOccupation:
        (p.nbPlaces ?? 0) > 0
          ? (((p.nbPlaces ?? 0) - (p.nbPlacesDisponibles ?? 0)) /
              (p.nbPlaces ?? 0)) *
            100
          : 0,
    }))
    .filter((p) => p.total > 0)
    .sort((a, b) => b.tauxOccupation - a.tauxOccupation)
    .slice(0, 10);

  // Répartition par type d'équipement
  const equipements = [
    {
      name: "PMR",
      value: parkings.reduce((sum, p) => sum + (p.nbPmr ?? 0), 0),
      color: "#3b82f6",
    },
    {
      name: "Électriques",
      value: parkings.reduce(
        (sum, p) => sum + (p.nbVoituresElectriques ?? 0),
        0
      ),
      color: "#10b981",
    },
    {
      name: "Vélos",
      value: parkings.reduce((sum, p) => sum + (p.nbVelo ?? 0), 0),
      color: "#f59e0b",
    },
    {
      name: "2 roues élec.",
      value: parkings.reduce((sum, p) => sum + (p.nb2rEl ?? 0), 0),
      color: "#8b5cf6",
    },
    {
      name: "Autopartage",
      value: parkings.reduce((sum, p) => sum + (p.nbAutopartage ?? 0), 0),
      color: "#ec4899",
    },
    {
      name: "2 roues motor.",
      value: parkings.reduce((sum, p) => sum + (p.nb2Rm ?? 0), 0),
      color: "#f97316",
    },
  ].filter((e) => e.value > 0);

  // Distribution des tailles de parkings
  const distributionTailles = [
    {
      categorie: "< 100 places",
      count: parkings.filter((p) => (p.nbPlaces ?? 0) < 100).length,
    },
    {
      categorie: "100-300",
      count: parkings.filter(
        (p) => (p.nbPlaces ?? 0) >= 100 && (p.nbPlaces ?? 0) < 300
      ).length,
    },
    {
      categorie: "300-500",
      count: parkings.filter(
        (p) => (p.nbPlaces ?? 0) >= 300 && (p.nbPlaces ?? 0) < 500
      ).length,
    },
    {
      categorie: "500-1000",
      count: parkings.filter(
        (p) => (p.nbPlaces ?? 0) >= 500 && (p.nbPlaces ?? 0) < 1000
      ).length,
    },
    {
      categorie: "> 1000",
      count: parkings.filter((p) => (p.nbPlaces ?? 0) >= 1000).length,
    },
  ];

  // Données pour le graphique d'occupation globale
  const occupationData = [
    { name: "Occupées", value: totalOccupees, color: "#ef4444" },
    { name: "Disponibles", value: totalDisponibles, color: "#22c55e" },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs Principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Total Parkings</h3>
            <svg
              className="w-8 h-8 opacity-80"
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
          <p className="text-4xl font-bold">{parkings.length}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Total Places</h3>
            <svg
              className="w-8 h-8 opacity-80"
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
          </div>
          <p className="text-4xl font-bold">{totalPlaces.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">Disponibles</h3>
            <svg
              className="w-8 h-8 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold">
            {totalDisponibles.toLocaleString()}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium opacity-90">
              Taux d&apos;Occupation
            </h3>
            <svg
              className="w-8 h-8 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <p className="text-4xl font-bold">{tauxOccupation}%</p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique d'occupation globale */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Occupation Globale
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={occupationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) =>
                  `${name}: ${value.toLocaleString()} (${
                    percent ? (percent * 100).toFixed(0) : 0
                  }%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {occupationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition des équipements */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Équipements Spécialisés
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={equipements}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6">
                {equipements.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Parkings les plus occupés */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Top 10 - Parkings les Plus Occupés
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={parkingsOccupation} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="nom" type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="occupees"
              stackId="a"
              fill="#ef4444"
              name="Occupées"
            />
            <Bar
              dataKey="disponibles"
              stackId="a"
              fill="#22c55e"
              name="Disponibles"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Distribution des tailles */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Distribution par Taille de Parking
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={distributionTailles}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categorie" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8b5cf6"
              strokeWidth={3}
              name="Nombre de parkings"
              dot={{ fill: "#8b5cf6", r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Statistiques détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h4 className="text-sm font-medium text-slate-600 mb-2">
            Plus Grand Parking
          </h4>
          <p className="text-2xl font-bold text-slate-800">
            {Math.max(...parkings.map((p) => p.nbPlaces ?? 0)).toLocaleString()}{" "}
            places
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {
              parkings.find(
                (p) =>
                  p.nbPlaces ===
                  Math.max(...parkings.map((p) => p.nbPlaces ?? 0))
              )?.nom
            }
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h4 className="text-sm font-medium text-slate-600 mb-2">
            Capacité Moyenne
          </h4>
          <p className="text-2xl font-bold text-slate-800">
            {Math.round(totalPlaces / parkings.length).toLocaleString()} places
          </p>
          <p className="text-sm text-slate-500 mt-1">par parking</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h4 className="text-sm font-medium text-slate-600 mb-2">
            Places PMR Totales
          </h4>
          <p className="text-2xl font-bold text-slate-800">
            {parkings
              .reduce((sum, p) => sum + (p.nbPmr ?? 0), 0)
              .toLocaleString()}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {(
              (parkings.reduce((sum, p) => sum + (p.nbPmr ?? 0), 0) /
                totalPlaces) *
              100
            ).toFixed(1)}
            % du total
          </p>
        </div>
      </div>
    </div>
  );
}
