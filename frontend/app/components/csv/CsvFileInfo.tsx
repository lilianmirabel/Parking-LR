import { CsvFile, UploadStatus } from "@/app/types/csv";
import { formatFileSize } from "@/app/services/csvService";

interface CsvFileInfoProps {
  file: CsvFile;
  status: UploadStatus;
  onRemove: () => void;
}

function StatusIcon({ status }: { status: UploadStatus }) {
  switch (status) {
    case "uploading":
      return (
        <div className="p-2 bg-blue-100 rounded-full">
          <svg
            className="w-5 h-5 text-blue-600 animate-spin"
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
      );
    case "success":
      return (
        <div className="p-2 bg-green-100 rounded-full">
          <svg
            className="w-5 h-5 text-green-600"
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
        </div>
      );
    case "error":
      return (
        <div className="p-2 bg-red-100 rounded-full">
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      );
    default:
      return (
        <div className="p-2 bg-slate-100 rounded-full">
          <svg
            className="w-5 h-5 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      );
  }
}

export default function CsvFileInfo({
  file,
  status,
  onRemove,
}: CsvFileInfoProps) {
  const isRemovable = status === "idle" || status === "error" || status === "success";

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm w-full">
      <StatusIcon status={status} />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">
          {file.name}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          {formatFileSize(file.size)}
        </p>
      </div>

      {isRemovable && (
        <button
          onClick={onRemove}
          className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-slate-100"
          aria-label="Supprimer le fichier"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
}