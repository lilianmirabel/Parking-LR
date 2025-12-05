import CsvFileSelector from "./components/csv/CsvFileSelector";
import ParkingList from "./components/parking/ParkingList";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <svg
                className="w-8 h-8 text-white"
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
              <h1 className="text-2xl font-bold text-white">
                Parking LR
              </h1>
              <p className="text-blue-100 text-sm">
                Gestion et visualisation des parkings
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Import Section */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-blue-100 rounded-lg">
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-800">
                Import de donnees
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Importez un fichier CSV pour ajouter ou mettre a jour les donnees des parkings
            </p>
            <div className="flex justify-center">
              <CsvFileSelector />
            </div>
          </div>
        </section>

        {/* Parking List Section */}
        <section>
          <ParkingList />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <p className="text-center text-sm text-slate-500">
            Parking LR - Application de gestion des parkings
          </p>
        </div>
      </footer>
    </div>
  );
}