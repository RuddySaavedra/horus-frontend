// src/api/tracking.ts
import { api } from "./client";
import type {
    StartTripDto,
    FinishTripDto,
    PositionUpdateDto,
    BagEventDto,
    IncidentDto,
    Trip,
} from "./types";

export async function startTrip(dto: StartTripDto): Promise<Trip> {
    const { data } = await api.post<Trip>("/api/Tracking/start", dto);
    return data;
}

export async function finishTrip(dto: FinishTripDto): Promise<void> {
    await api.post("/api/Tracking/finish", dto);
}

export async function sendPosition(dto: PositionUpdateDto): Promise<void> {
    await api.post("/api/Tracking/position", dto);
}

export async function registerBag(dto: BagEventDto): Promise<void> {
    await api.post("/api/Tracking/bag", dto);
}

export async function reportIncident(dto: IncidentDto): Promise<void> {
    await api.post("/api/Tracking/incident", dto);
}
