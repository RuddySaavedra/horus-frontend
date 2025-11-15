import { useState, useEffect } from 'react';
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
  status: 'En progreso' | 'Completada';
  incidents: number;
}

interface RecorridosViewProps {
  selectedMacroroute: string;
  collectors: Collector[];
  routes: Route[];
  initialSelectedCollector?: number | null;
}

export function RecorridosView({ 
  selectedMacroroute, 
  collectors, 
  routes,
  initialSelectedCollector 
}: RecorridosViewProps) {
  const [selectedCollector, setSelectedCollector] = useState<number | null>(null);

  useEffect(() => {
    if (initialSelectedCollector) {
      setSelectedCollector(initialSelectedCollector);
    }
  }, [initialSelectedCollector]);

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 flex-1 min-h-0">
        {/* Map - Full width on mobile, 2 columns on desktop */}
        <div className="xl:col-span-2 min-h-[400px] xl:min-h-0">
          <MapView 
            macroroute={selectedMacroroute}
            selectedCollector={selectedCollector}
          />
        </div>
        
        {/* Collectors List - Full width on mobile, 1 column on desktop */}
        <div className="xl:col-span-1 min-h-[300px] xl:min-h-0">
          <CollectorsList 
            collectors={collectors}
            selectedCollector={selectedCollector}
            onSelectCollector={setSelectedCollector}
          />
        </div>
      </div>
      
      {/* Routes Table */}
      <div className="overflow-hidden">
        <RoutesTable routes={routes} />
      </div>
    </div>
  );
}