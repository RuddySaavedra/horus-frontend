import { useState } from 'react';
import { MapView } from '../MapView';
import { CollectorsList } from '../CollectorsList';
import { RoutesTable } from '../RoutesTable';

interface Collector {
  id: number;
  name: string;
  photo: string;
  microroute: string;
  status: 'en-ruta' | 'fuera-ruta' | 'sin-señal';
  lastUpdate: string;
}

interface Route {
  id: string;
  collector: string;
  bagsCollected: number;
  coverage: number;
  timeActual: string;
  timeEstimated: string;
  status: 'En progreso' | 'Completada' | 'Incompleta';
  incidents: number;
}

interface RecorridosViewProps {
  selectedMacroroute: string;
  collectors: Collector[];
  routes: Route[];
}

export function RecorridosView({ selectedMacroroute, collectors, routes }: RecorridosViewProps) {
  const [selectedCollector, setSelectedCollector] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1 flex gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <MapView 
            macroroute={selectedMacroroute}
            collectors={collectors}
            selectedCollector={selectedCollector}
          />
          <RoutesTable routes={routes} />
        </div>
        
        <CollectorsList 
          collectors={collectors}
          selectedCollector={selectedCollector}
          onSelectCollector={setSelectedCollector}
        />
      </div>
    </div>
  );
}
