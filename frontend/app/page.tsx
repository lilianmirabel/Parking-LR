import CsvFileSelector from "./components/CsvFileSelector";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-8 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Import de données Parking
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Sélectionnez un fichier CSV contenant les données de parking
          </p>
        </div>
        <CsvFileSelector />
      </main>
    </div>
  );
}