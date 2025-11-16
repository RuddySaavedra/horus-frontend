import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";


// Tipo mínimo para lo que viene desde RecorridosView
interface MapCollector {
    id: number;
    name: string;
    photo: string;
    microroute: string;
    status: "en-ruta" | "fuera-ruta" | "sin-señal";
    lastUpdate: string;
}

export interface MapViewProps {
    collectors: MapCollector[];
    selectedCollector: number | null;
}

export function MapView({ collectors, selectedCollector }: MapViewProps) {
    // Aunque todavía no uses collectors o selectedCollector,
    // ya no habrá error de tipos.
    // Aquí va tu lógica actual del mapa.

    return (
        <MapContainer
            center={[-17.7833, -63.1821]} // Santa Cruz de la Sierra de ejemplo
            zoom={13}
            className="w-full h-80 rounded-xl overflow-hidden"
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Más adelante puedes usar `collectors` para dibujar marcadores */}
            {/* collectors.map(c => (
         <Marker key={c.id} position={[lat, lng]} />
      )) */}
        </MapContainer>
    );
}