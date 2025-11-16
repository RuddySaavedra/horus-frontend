// src/api/collectors.ts
import { api } from "./client";
import type {Recolector} from "./types";

export async function getRecolectores(): Promise<Recolector[]> {
    const { data } = await api.get<Recolector[]>("/api/Recolectores");
    return data;
}

export async function getRecolectorById(id: number): Promise<Recolector> {
    const { data } = await api.get<Recolector>(`/api/Recolectores/${id}`);
    return data;
}

export async function getRecolectoresStatus(): Promise<Recolector[]> {
    const { data } = await api.get<Recolector[]>(
        "/api/Recolectores"
    );
    return data;
}

