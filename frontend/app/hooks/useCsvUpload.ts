"use client";

import { useState, useCallback } from "react";
import { UploadState, CsvFile, UploadResult } from "@/app/types/csv";
import {
  uploadCsv,
  validateCsvFile,
  CsvServiceError,
} from "@/app/services/csvService";

const initialState: UploadState = {
  file: null,
  status: "idle",
  error: null,
  progress: 0,
};

export function useCsvUpload() {
  const [state, setState] = useState<UploadState>(initialState);

  const selectFile = useCallback((file: File) => {
    // Validate file
    const validationError = validateCsvFile(file);
    if (validationError) {
      setState({
        file: null,
        status: "error",
        error: validationError.message,
        progress: 0,
      });
      return false;
    }

    // File is valid
    const csvFile: CsvFile = {
      name: file.name,
      size: file.size,
      file: file,
    };

    setState({
      file: csvFile,
      status: "idle",
      error: null,
      progress: 0,
    });

    return true;
  }, []);

  const upload = useCallback(async (): Promise<UploadResult | null> => {
    if (!state.file) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: "Aucun fichier sélectionné",
      }));
      return null;
    }

    setState((prev) => ({
      ...prev,
      status: "uploading",
      error: null,
      progress: 0,
    }));

    try {
      const result = await uploadCsv(state.file.file, (progress) => {
        setState((prev) => ({ ...prev, progress }));
      });

      setState((prev) => ({
        ...prev,
        status: "success",
        progress: 100,
      }));

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof CsvServiceError
          ? error.message
          : "Une erreur inattendue s'est produite";

      setState((prev) => ({
        ...prev,
        status: "error",
        error: errorMessage,
        progress: 0,
      }));

      return null;
    }
  }, [state.file]);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    // State
    file: state.file,
    status: state.status,
    error: state.error,
    progress: state.progress,

    // Computed
    isIdle: state.status === "idle",
    isUploading: state.status === "uploading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    hasFile: state.file !== null,

    // Actions
    selectFile,
    upload,
    reset,
    clearError,
  };
}