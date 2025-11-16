// src/api/routes.ts
import { api } from "./client";
import type {MacrorutaDto, MicrorutaDto} from "./types";

export async function getMacrorutas(): Promise<MacrorutaDto[]> {
    const { data } = await api.get<MacrorutaDto[]>("/api/Routes/macrorutas");
    return data;
}

export async function getMicrorutas(
    macrorutaId?: number
): Promise<MicrorutaDto[]> {
    const { data } = await api.get<MicrorutaDto[]>("/api/Routes/microrutas", {
        params: macrorutaId ? { macrorutaId } : {},
    });
    return data;
}

export async function getMicrorutaById(id: number): Promise<MicrorutaDto> {
    const { data } = await api.get<MicrorutaDto>(`/api/Routes/microrutas/${id}`);
    return data;
}
