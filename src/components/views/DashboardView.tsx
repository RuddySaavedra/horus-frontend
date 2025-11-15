import { KPICards } from '../dashboard/KPICards';
import { ChartsSection } from '../dashboard/ChartsSection';
import { MicroroutesTable } from '../dashboard/MicroroutesTable';

interface Microroute {
  id: string;
  collector: string;
  macroroute: string;
  coverage: number;
  timeActual: string;
  timeEstimated: string;
  bags: number;
  status: 'En progreso' | 'Completada' | 'Desviada';
  incidents: number;
}

interface DashboardViewProps {
  microroutes: Microroute[];
}

export function DashboardView({ microroutes }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      <KPICards microroutes={microroutes} />
      <ChartsSection microroutes={microroutes} />
      <MicroroutesTable microroutes={microroutes} />
    </div>
  );
}
