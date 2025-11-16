// src/components/LeafletRouting.tsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

interface LeafletRoutingProps {
    from: [number, number];
    to: [number, number];
    color?: string;
}

export function LeafletRouting({ from, to, color = "#16a34a" }: LeafletRoutingProps) {
    const map = useMap(); // ← obtenemos el mapa de react-leaflet

    useEffect(() => {
        if (!map) return;

        const routingControl = (L as any).Routing.control({
            waypoints: [
                L.latLng(from[0], from[1]),
                L.latLng(to[0], to[1]),
            ],
            lineOptions: {
                styles: [
                    {
                        color,
                        weight: 5,
                        opacity: 0.9,
                    },
                ],
            },
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            show: false,
            createMarker: () => null, // sin marcadores por defecto
        }).addTo(map);

        // opcional: loguear errores sin spamear
        routingControl.on("routingerror", (e: any) => {
            console.error("Routing error:", e?.error || e);
        });

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, from, to, color]);

    return null;
}
