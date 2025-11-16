import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

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

interface RoutesTableProps {
  routes: Route[];
}

export function RoutesTable({ routes }: RoutesTableProps) {
  const getStatusConfig = (status: string, coverage: number) => {
    if (status === 'Completada') {
      return { 
        icon: CheckCircle2, 
        color: 'text-brand-primary', 
        bg: 'bg-green-50',
        text: 'Completada'
      };
    }
    if (coverage < 50) {
      return { 
        icon: AlertTriangle, 
        color: 'text-yellow-600', 
        bg: 'bg-yellow-50',
        text: 'En progreso'
      };
    }
    return { 
      icon: Clock, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      text: 'En progreso'
    };
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-brand-neutral">Recorridos del Día</h3>
        <p className="text-sm text-gray-500 mt-1">{routes.length} microrutas asignadas</p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Recolector</TableHead>
              <TableHead className="text-center">Bolsas</TableHead>
              <TableHead className="text-center">Cobertura</TableHead>
              <TableHead>Tiempo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Incidentes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => {
              const statusConfig = getStatusConfig(route.status, route.coverage);
              const StatusIcon = statusConfig.icon;

              return (
                <TableRow key={route.id} className="hover:bg-gray-50">
                  <TableCell>
                    <span className="text-brand-neutral">{route.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-brand-neutral">{route.collector}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm">
                      {route.bagsCollected}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-primary transition-all"
                          style={{ width: `${route.coverage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12">{route.coverage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="text-brand-neutral">{route.timeActual}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-gray-500">{route.timeEstimated}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${statusConfig.bg} ${statusConfig.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig.text}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {route.incidents > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 text-sm">
                        <AlertTriangle className="w-3 h-3" />
                        {route.incidents}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}