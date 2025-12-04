"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface SelectedFile {
  name: string;
  size: number;
  file: File;
}

export default function CsvFileSelector() {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFile = (file: File) => {
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      setSelectedFile({
        name: file.name,
        size: file.size,
        file: file,
      });
    } else {
      alert("Veuillez sélectionner un fichier CSV");
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          flex flex-col items-center justify-center
          w-full h-48 px-6 py-8
          border-2 border-dashed rounded-xl
          cursor-pointer transition-all duration-200
          ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
              : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
          }
          ${selectedFile ? "bg-green-50 dark:bg-green-950/20 border-green-400 dark:border-green-700" : ""}
        `}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <svg
              className="w-10 h-10 text-green-500"
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
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              {selectedFile.name}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {formatFileSize(selectedFile.size)}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="mt-2 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-colors"
            >
              Supprimer
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <svg
              className="w-10 h-10 text-zinc-400 dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div>
              <p className="font-medium text-zinc-700 dark:text-zinc-300">
                Glissez-déposez votre fichier CSV
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                ou cliquez pour parcourir
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}