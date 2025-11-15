import { useState } from 'react';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { RecorridosView } from './components/views/RecorridosView';
import { RecolectoresView } from './components/views/RecolectoresView';

// Mock data for collectors
const mockCollectors = [
  {
    id: 1,
    name: 'Juan Pérez',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    microroute: 'MR-01',
    status: 'en-ruta' as const,
    lastUpdate: '10:45 AM'
  },
  {
    id: 2,
    name: 'María García',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    microroute: 'MR-02',
    status: 'en-ruta' as const,
    lastUpdate: '10:43 AM'
  },
  {
    id: 3,
    name: 'Carlos Mendoza',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    microroute: 'MR-03',
    status: 'fuera-ruta' as const,
    lastUpdate: '10:40 AM'
  },
  {
    id: 4,
    name: 'Ana Rodríguez',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    microroute: 'MR-04',
    status: 'en-ruta' as const,
    lastUpdate: '10:44 AM'
  },
  {
    id: 5,
    name: 'Pedro Sánchez',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    microroute: 'MR-05',
    status: 'sin-señal' as const,
    lastUpdate: '10:20 AM'
  },
  {
    id: 6,
    name: 'Laura Fernández',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    microroute: 'MR-06',
    status: 'en-ruta' as const,
    lastUpdate: '10:42 AM'
  }
];

// Mock data for routes
const mockRoutes = [
  {
    id: 'MR-01',
    collector: 'Juan Pérez',
    bagsCollected: 24,
    coverage: 85,
    timeActual: '2h 15m',
    timeEstimated: '2h 30m',
    status: 'En progreso' as const,
    incidents: 0
  },
  {
    id: 'MR-02',
    collector: 'María García',
    bagsCollected: 18,
    coverage: 72,
    timeActual: '1h 45m',
    timeEstimated: '2h 00m',
    status: 'En progreso' as const,
    incidents: 1
  },
  {
    id: 'MR-03',
    collector: 'Carlos Mendoza',
    bagsCollected: 12,
    coverage: 45,
    timeActual: '1h 30m',
    timeEstimated: '2h 15m',
    status: 'En progreso' as const,
    incidents: 2
  },
  {
    id: 'MR-04',
    collector: 'Ana Rodríguez',
    bagsCollected: 32,
    coverage: 100,
    timeActual: '2h 40m',
    timeEstimated: '2h 30m',
    status: 'Completada' as const,
    incidents: 0
  },
  {
    id: 'MR-05',
    collector: 'Pedro Sánchez',
    bagsCollected: 8,
    coverage: 30,
    timeActual: '1h 00m',
    timeEstimated: '2h 20m',
    status: 'En progreso' as const,
    incidents: 1
  },
  {
    id: 'MR-06',
    collector: 'Laura Fernández',
    bagsCollected: 28,
    coverage: 90,
    timeActual: '2h 10m',
    timeEstimated: '2h 15m',
    status: 'En progreso' as const,
    incidents: 0
  }
];

// Mock data
const mockMicroroutes = [
  {
    id: 'MR-01',
    collector: 'Juan Pérez',
    macroroute: 'Verde',
    coverage: 85,
    timeActual: '2h 15m',
    timeEstimated: '2h 30m',
    bags: 24,
    status: 'En progreso' as const,
    incidents: 0
  },
  {
    id: 'MR-02',
    collector: 'María García',
    macroroute: 'Roja',
    coverage: 72,
    timeActual: '1h 45m',
    timeEstimated: '2h 00m',
    bags: 18,
    status: 'En progreso' as const,
    incidents: 1
  },
  {
    id: 'MR-03',
    collector: 'Carlos Mendoza',
    macroroute: 'Verde',
    coverage: 45,
    timeActual: '1h 30m',
    timeEstimated: '2h 15m',
    bags: 12,
    status: 'Desviada' as const,
    incidents: 2
  },
  {
    id: 'MR-04',
    collector: 'Ana Rodríguez',
    macroroute: 'Naranja',
    coverage: 100,
    timeActual: '2h 40m',
    timeEstimated: '2h 30m',
    bags: 32,
    status: 'Completada' as const,
    incidents: 0
  },
  {
    id: 'MR-05',
    collector: 'Pedro Sánchez',
    macroroute: 'Lila',
    coverage: 30,
    timeActual: '1h 00m',
    timeEstimated: '2h 20m',
    bags: 8,
    status: 'En progreso' as const,
    incidents: 1
  },
  {
    id: 'MR-06',
    collector: 'Laura Fernández',
    macroroute: 'Roja',
    coverage: 90,
    timeActual: '2h 10m',
    timeEstimated: '2h 15m',
    bags: 28,
    status: 'En progreso' as const,
    incidents: 0
  }
];

export default function App() {
  const [selectedDate, setSelectedDate] = useState('2025-11-15');
  const [selectedMacroroutes, setSelectedMacroroutes] = useState<string[]>(['Verde', 'Roja', 'Naranja', 'Lila']);
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedCollectorId, setSelectedCollectorId] = useState<number | null>(null);

  const toggleMacroroute = (macroroute: string) => {
    setSelectedMacroroutes(prev => 
      prev.includes(macroroute) 
        ? prev.filter(m => m !== macroroute)
        : [...prev, macroroute]
    );
  };

  const filteredMicroroutes = mockMicroroutes.filter(mr => 
    selectedMacroroutes.includes(mr.macroroute)
  );

  // Get the first selected macroroute for the map view
  const currentMacroroute = selectedMacroroutes.length > 0 ? selectedMacroroutes[0] : 'Verde';

  const handleNavigateToMap = (collectorId: number) => {
    setSelectedCollectorId(collectorId);
    setActiveView('recorridos');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5]">
      <DashboardHeader 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedMacroroutes={selectedMacroroutes}
        toggleMacroroute={toggleMacroroute}
        microroutes={mockMicroroutes}
      />
      
      <div className="flex h-[calc(100vh-88px)]">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {activeView === 'dashboard' && (
            <DashboardView microroutes={filteredMicroroutes} />
          )}
          
          {activeView === 'recorridos' && (
            <RecorridosView 
              selectedMacroroute={currentMacroroute}
              collectors={mockCollectors}
              routes={mockRoutes}
              initialSelectedCollector={selectedCollectorId}
            />
          )}
          
          {activeView === 'recolectores' && (
            <RecolectoresView onNavigateToMap={handleNavigateToMap} />
          )}
        </main>
      </div>
    </div>
  );
}