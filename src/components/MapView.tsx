import { AlertTriangle, Navigation } from 'lucide-react';
import { useState } from 'react';

interface Collector {
  id: number;
  name: string;
  microroute: string;
  status: 'en-ruta' | 'fuera-ruta' | 'sin-señal';
}

interface MapViewProps {
  macroroute: string;
  collectors: Collector[];
  selectedCollector: number | null;
}

export function MapView({ macroroute, selectedCollector }: MapViewProps) {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  // Simulate route points and incidents
  const idealRoute = [
    { x: 15, y: 20 },
    { x: 25, y: 25 },
    { x: 35, y: 20 },
    { x: 45, y: 30 },
    { x: 55, y: 35 },
    { x: 65, y: 30 },
    { x: 75, y: 40 },
    { x: 85, y: 45 }
  ];

  const actualRoute = [
    { x: 15, y: 20 },
    { x: 25, y: 24 },
    { x: 35, y: 22 },
    { x: 45, y: 32 },
    { x: 55, y: 37 },
    { x: 60, y: 35 }
  ];

  const incidents = [
    { x: 45, y: 30, type: 'Contenedor lleno', id: 1 },
    { x: 75, y: 40, type: 'Acceso bloqueado', id: 2 }
  ];

  const collectorPosition = { x: 60, y: 35 };

  const getMacrorouteColor = (route: string) => {
    const colors: { [key: string]: string } = {
      'Roja': '#EF4444',
      'Verde': '#10813F',
      'Naranja': '#F97316',
      'Lila': '#A855F7'
    };
    return colors[route] || '#10813F';
  };

  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-brand-neutral">Macroruta {macroroute} – En progreso</h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-gray-400" />
            <span className="text-gray-600">Ruta ideal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-brand-primary" style={{ height: '3px' }} />
            <span className="text-gray-600">Ruta real</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200" />
            <span className="text-gray-600">Zona no cubierta</span>
          </div>
        </div>
      </div>

      <div className="flex-1 relative bg-gray-50 p-6">
        {/* Map grid background */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Simulated map content */}
        <svg className="w-full h-full relative" viewBox="0 0 100 60">
          {/* Uncovered zones */}
          <rect x="70" y="20" width="15" height="12" fill="#E5E7EB" opacity="0.5" rx="2" />
          <rect x="40" y="45" width="12" height="10" fill="#E5E7EB" opacity="0.5" rx="2" />

          {/* Ideal route (gray dashed line) */}
          <path
            d={`M ${idealRoute.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}`}
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />

          {/* Actual route (green solid line) */}
          <path
            d={`M ${actualRoute.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}`}
            fill="none"
            stroke="#10813F"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Route points */}
          {actualRoute.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="0.8"
              fill="#10813F"
              onMouseEnter={() => setHoveredPoint(`point-${i}`)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="cursor-pointer"
            />
          ))}

          {/* Incidents */}
          {incidents.map((incident) => (
            <g key={incident.id}>
              <circle
                cx={incident.x}
                cy={incident.y}
                r="2"
                fill="#FEF3C7"
                stroke="#F59E0B"
                strokeWidth="0.3"
              />
              <foreignObject
                x={incident.x - 1.5}
                y={incident.y - 1.5}
                width="3"
                height="3"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <AlertTriangle className="w-2 h-2 text-yellow-600" style={{ width: '2px', height: '2px' }} />
                </div>
              </foreignObject>
            </g>
          ))}

          {/* Collector position */}
          <g>
            <circle
              cx={collectorPosition.x}
              cy={collectorPosition.y}
              r="2.5"
              fill={getMacrorouteColor(macroroute)}
              stroke="white"
              strokeWidth="0.5"
              className={selectedCollector ? 'animate-pulse' : ''}
            />
            <foreignObject
              x={collectorPosition.x - 1.5}
              y={collectorPosition.y - 1.5}
              width="3"
              height="3"
            >
              <div className="w-full h-full flex items-center justify-center">
                <Navigation className="w-2 h-2 text-white" style={{ width: '1.5px', height: '1.5px' }} fill="white" />
              </div>
            </foreignObject>
          </g>
        </svg>

        {/* Hover info */}
        {hoveredPoint && (
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-2 text-sm">
            <p className="text-gray-600">Tiempo: 1h 45m</p>
            <p className="text-gray-600">Distancia: 3.2 km</p>
          </div>
        )}

        {/* Map info overlay */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3 space-y-1 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Cobertura:</span>
            <span className="text-brand-primary">72%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Distancia recorrida:</span>
            <span className="text-brand-neutral">8.5 km / 12 km</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Incidentes:</span>
            <span className="text-yellow-600">2 activos</span>
          </div>
        </div>
      </div>
    </div>
  );
}