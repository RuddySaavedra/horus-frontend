// src/components/MapView.tsx
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MICRO_ROUTES } from "../data/routes";
import { LeafletRouting } from "./LeafletRouting";

interface MapViewProps {
    collectors: unknown[];          // por ahora no los usamos
    selectedCollector: number | null;
    selectedMacroroute: string;
}
const ROUTE_COLORS: Record<string, string> = {
    Verde: "#16a34a",
    Roja: "#dc2626",
    Naranja: "#ea580c",
    Lila: "#9333ea",
    "Sin ruta": "#0ea5e9",
};


export function MapView({ selectedMacroroute }: MapViewProps) {
    const microroutes = MICRO_ROUTES[selectedMacroroute] ?? [];
    const color = ROUTE_COLORS[selectedMacroroute] ?? "#16a34a";
    return (
        <div className="w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-gray-300 shadow-md">
            <MapContainer
                center={[-17.7835, -63.1821]}
                zoom={15}
                className="w-full h-full"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Renderizar múltiples rutas según la macroruta seleccionada */}
                {microroutes.map((route) => (
                    <LeafletRouting
                        key={route.id}
                        from={route.from}
                        to={route.to}
                        color={color}
                    />
                ))}

                {/* aquí luego podrás usar collectors / selectedCollector para markers */}
            </MapContainer>
        </div>
    );
}
