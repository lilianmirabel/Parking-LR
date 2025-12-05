"use client";

import { useRef, DragEvent, ChangeEvent, useState } from "react";
import { useCsvUpload } from "@/app/hooks/useCsvUpload";
import CsvFileInfo from "./CsvFileInfo";
import CsvUploadButton from "./CsvUploadButton";

export default function CsvFileSelector() {
  const [isDragging, setIsDragging] = useState(false);
  const inputId = "csv-file-input";

  const {
    file,
    status,
    error,
    hasFile,
    selectFile,
    upload,
    reset,
  } = useCsvUpload();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      selectFile(droppedFile);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      selectFile(selectedFile);
    }
  };

  const handleRemove = () => {
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <input
        type="file"
        id={inputId}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="sr-only"
      />

      {/* Drop Zone */}
      {hasFile && file ? (
        <div className="flex flex-col items-center justify-center w-full min-h-44 px-6 py-8 bg-white border-2 border-dashed border-blue-300 rounded-2xl shadow-sm">
          <CsvFileInfo file={file} status={status} onRemove={handleRemove} />
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            flex flex-col items-center justify-center
            w-full min-h-44 px-6 py-8
            bg-white
            border-2 border-dashed rounded-2xl
            cursor-pointer transition-all duration-300
            shadow-sm hover:shadow-md
            focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
            ${
              isDragging
                ? "border-blue-500 bg-blue-50 scale-[1.02]"
                : "border-slate-300 hover:border-blue-400"
            }
          `}
        >
          <span className="sr-only">Selectionner un fichier CSV</span>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className={`
              p-4 rounded-full transition-colors duration-300
              ${isDragging
                ? "bg-blue-100"
                : "bg-slate-100"
              }
            `}>
              <svg
                className={`w-8 h-8 transition-colors duration-300 ${
                  isDragging
                    ? "text-blue-600"
                    : "text-slate-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div aria-hidden="true">
              <p className="font-medium text-slate-700">
                Glissez-deposez votre fichier CSV
              </p>
              <p className="text-sm text-slate-500 mt-1">
                ou <span className="text-blue-600 font-medium">cliquez pour parcourir</span>
              </p>
            </div>
          </div>
        </label>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="p-1 bg-red-100 rounded-full">
            <svg
              className="w-4 h-4 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex justify-center">
        <CsvUploadButton
          status={status}
          hasFile={hasFile}
          onUpload={upload}
          onReset={handleRemove}
        />
      </div>
    </div>
  );
}