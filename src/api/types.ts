// src/api/types.ts

export interface BagEventDto {
    tripId: number;
    timestamp?: string | null; // ISO date
}

export interface FinishTripDto {
    tripId: number;
    fin?: string | null;
}

export interface IncidentDto {
    tripId: number;
    latitude: number;
    longitude: number;
    tipo?: string | null;
    descripcion?: string | null;
    timestamp?: string | null;
}

export interface MacrorutaDto {
    id: number;
    nombre: string | null;
    colorHex: string | null;
    microrutasCount: number;
}

export interface MicrorutaPointDto {
    latitude: number;
    longitude: number;
    isBlocked: boolean;
}

export interface MicrorutaDto {
    id: number;
    nombre: string | null;
    macrorutaId: number;
    macrorutaNombre: string | null;
    points?: MicrorutaPointDto[] | null;
}

export interface PositionUpdateDto {
    tripId: number;
    latitude: number;
    longitude: number;
    timestamp?: string | null;
}

export interface Recolector {
    id: number;
    nombre?: string | null;
    activo: boolean;
    trips?: Trip[];
}


export interface RecolectorStatusDto {
    recolectorId: number;
    recolectorNombre: string | null;
    microrutaId?: number | null;
    microrutaNombre?: string | null;
    estado?: string | null;
    ultimaActualizacion?: string | null;
    bolsas: number;
    coberturaPorciento: number;
    latitude?: number | null;
    longitude?: number | null;
}

export interface StartTripDto {
    recolectorId: number;
    microrutaId: number;
    inicio?: string | null;
}

export interface Trip {
    id: number;
    recolectorId: number;
    microrutaId: number;
    inicio: string;
    fin?: string | null;
    bolsas: number;
    coberturaPorciento: number;
    distanciaMetros: number;
    estado?: string | null;
}

export interface TripSummaryDto {
    id: number;
    recolectorNombre: string | null;
    microrutaNombre: string | null;
    inicio: string;
    fin?: string | null;
    bolsas: number;
    coberturaPorciento: number;
    distanciaMetros: number;
    estado?: string | null;
    incidentes: number;
    duracionMinutos: number;
}

export interface PositionSample {
    id: number;
    tripId: number;
    latitude: number;
    longitude: number;
    timestamp: string;
}
