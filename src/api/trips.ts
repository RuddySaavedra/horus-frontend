// src/api/trips.ts
import { api } from "./client";
import type {Trip, TripSummaryDto, PositionSample} from "./types";

export async function getTrips(params?: {
    macrorutaId?: number;
    date?: string; // ISO string
}): Promise<TripSummaryDto[]> {
    const { data } = await api.get<TripSummaryDto[]>("/api/Trips", {
        params,
    });
    return data;
}

export async function getActiveTrips(macrorutaId?: number) {
    const { data } = await api.get<TripSummaryDto[]>("/api/Trips/activos", {
        params: macrorutaId ? { macrorutaId } : {},
    });
    return data;
}

export async function getTripById(id: number): Promise<Trip> {
    const { data } = await api.get<Trip>(`/api/Trips/${id}`);
    return data;
}

export async function getTripPositions(
    id: number
): Promise<PositionSample[]> {
    const { data } = await api.get<PositionSample[]>(
        `/api/Trips/${id}/positions`
    );
    return data;
}
