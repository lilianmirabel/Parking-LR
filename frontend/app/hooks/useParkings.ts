"use client";

import { useState, useEffect, useCallback } from "react";
import { Parking } from "@/app/types/parking";
import { getAllParkings, ParkingServiceError } from "@/app/services/parkingService";

type FetchStatus = "idle" | "loading" | "success" | "error";

interface UseParkingsState {
  parkings: Parking[];
  status: FetchStatus;
  error: string | null;
}

const initialState: UseParkingsState = {
  parkings: [],
  status: "idle",
  error: null,
};

export function useParkings() {
  const [state, setState] = useState<UseParkingsState>(initialState);

  const fetchParkings = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      status: "loading",
      error: null,
    }));

    try {
      const parkings = await getAllParkings();
      setState({
        parkings,
        status: "success",
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof ParkingServiceError
          ? error.message
          : "Une erreur inattendue s'est produite";

      setState({
        parkings: [],
        status: "error",
        error: errorMessage,
      });
    }
  }, []);

  useEffect(() => {
    fetchParkings();
  }, [fetchParkings]);

  return {
    parkings: state.parkings,
    status: state.status,
    error: state.error,

    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isEmpty: state.status === "success" && state.parkings.length === 0,

    refresh: fetchParkings,
  };
}