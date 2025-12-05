"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Parking } from "@/app/types/parking";
import { getAllParkings } from "@/app/services/parkingService";
import { getLiveParkings } from "@/app/services/liveService";

type FetchStatus = "idle" | "loading" | "success" | "error";

interface UseParkingsState {
  parkings: Parking[];
  status: FetchStatus;
  error: string | null;
  isLive: boolean;
  lastUpdated: Date | null;
}

const initialState: UseParkingsState = {
  parkings: [],
  status: "idle",
  error: null,
  isLive: false,
  lastUpdated: null,
};

const LIVE_REFRESH_INTERVAL = 60000; // 60 seconds

export function useParkings() {
  const [state, setState] = useState<UseParkingsState>(initialState);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchParkings = useCallback(async (live: boolean = false) => {
    setState((prev) => ({
      ...prev,
      status: "loading",
      error: null,
    }));

    try {
      const parkings = live ? await getLiveParkings() : await getAllParkings();
      setState((prev) => ({
        ...prev,
        parkings,
        status: "success",
        error: null,
        lastUpdated: new Date(),
      }));
    } catch (error) {
      // When the API fails (network error, server error, DB connection error, etc.),
      // treat it as "no data" rather than showing a technical error to the user
      setState((prev) => ({
        ...prev,
        parkings: [],
        status: "success",
        error: null,
        lastUpdated: null,
      }));
    }
  }, []);

  const setLive = useCallback((live: boolean) => {
    setState((prev) => ({
      ...prev,
      isLive: live,
    }));
  }, []);

  // Initial fetch and when isLive changes
  useEffect(() => {
    fetchParkings(state.isLive);
  }, [state.isLive, fetchParkings]);

  // Auto-refresh interval for live mode
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Set up new interval only if in live mode
    if (state.isLive) {
      intervalRef.current = setInterval(() => {
        fetchParkings(true);
      }, LIVE_REFRESH_INTERVAL);
    }

    // Cleanup on unmount or when isLive changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isLive, fetchParkings]);

  const refresh = useCallback(() => {
    fetchParkings(state.isLive);
  }, [fetchParkings, state.isLive]);

  return {
    parkings: state.parkings,
    status: state.status,
    error: state.error,
    isLive: state.isLive,
    lastUpdated: state.lastUpdated,

    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isEmpty: state.status === "success" && state.parkings.length === 0,

    refresh,
    setLive,
  };
}