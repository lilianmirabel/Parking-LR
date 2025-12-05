import { UploadStatus } from "@/app/types/csv";

interface CsvUploadButtonProps {
  status: UploadStatus;
  hasFile: boolean;
  onUpload: () => void;
  onReset: () => void;
}

export default function CsvUploadButton({
  status,
  hasFile,
  onUpload,
  onReset,
}: CsvUploadButtonProps) {
  const isUploading = status === "uploading";
  const isSuccess = status === "success";
  const canUpload = hasFile && (status === "idle" || status === "error");

  if (isSuccess) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-700 rounded-xl">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm font-semibold">Import reussi</span>
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
        >
          Importer un autre fichier
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onUpload}
      disabled={!canUpload}
      className={`
        flex items-center justify-center gap-2
        px-6 py-3 rounded-xl font-semibold text-sm
        transition-all duration-300
        ${
          canUpload
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]"
            : "bg-slate-200 text-slate-400 cursor-not-allowed"
        }
        ${isUploading ? "opacity-90" : ""}
      `}
    >
      {isUploading ? (
        <>
          <svg
            className="w-5 h-5 animate-spin"
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
          <span>Import en cours...</span>
        </>
      ) : (
        <>
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span>Importer le fichier</span>
        </>
      )}
    </button>
  );
}
