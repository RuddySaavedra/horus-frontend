import { Eye, AlertTriangle, CheckCircle2, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

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

interface MicroroutesTableProps {
  microroutes: Microroute[];
}

const macrorouteColors: { [key: string]: { bg: string; text: string } } = {
  Verde: { bg: 'bg-green-100', text: 'text-green-700' },
  Roja: { bg: 'bg-red-100', text: 'text-red-700' },
  Naranja: { bg: 'bg-orange-100', text: 'text-orange-700' },
  Lila: { bg: 'bg-purple-100', text: 'text-purple-700' }
};

export function MicroroutesTable({ microroutes }: MicroroutesTableProps) {
  const getStatusConfig = (status: string) => {
    const configs = {
      'Completada': { 
        icon: CheckCircle2, 
        color: 'text-brand-primary', 
        bg: 'bg-green-50',
        text: 'Completada'
      },
      'En progreso': { 
        icon: Clock, 
        color: 'text-blue-600', 
        bg: 'bg-blue-50',
        text: 'En progreso'
      },
      'Desviada': { 
        icon: AlertTriangle, 
        color: 'text-red-600', 
        bg: 'bg-red-50',
        text: 'Desviada'
      }
    };
    return configs[status as keyof typeof configs];
  };

  const getTimeComparison = (actual: string, estimated: string) => {
    // Simple comparison based on string (could be improved with actual time parsing)
    const actualMinutes = parseInt(actual.split('h')[0]) * 60 + parseInt(actual.split('h')[1]);
    const estimatedMinutes = parseInt(estimated.split('h')[0]) * 60 + parseInt(estimated.split('h')[1]);
    
    if (actualMinutes < estimatedMinutes) {
      return { icon: TrendingUp, color: 'text-brand-primary', ahead: true };
    } else if (actualMinutes > estimatedMinutes) {
      return { icon: TrendingDown, color: 'text-red-600', ahead: false };
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg text-brand-neutral">Microrutas del Día</h3>
        <p className="text-sm text-gray-500 mt-1">{microroutes.length} microrutas asignadas</p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Recolector</TableHead>
              <TableHead>Macroruta</TableHead>
              <TableHead className="text-center">Cobertura</TableHead>
              <TableHead>Tiempo</TableHead>
              <TableHead className="text-center">Bolsas</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Incidentes</TableHead>
              <TableHead className="text-right">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {microroutes.map((route) => {
              const statusConfig = getStatusConfig(route.status);
              const StatusIcon = statusConfig.icon;
              const macrorouteColor = macrorouteColors[route.macroroute];
              const timeComparison = getTimeComparison(route.timeActual, route.timeEstimated);
              const TimeIcon = timeComparison?.icon;

              return (
                <TableRow key={route.id} className="hover:bg-gray-50">
                  <TableCell>
                    <span className="text-gray-900">{route.id}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-gray-900">{route.collector}</span>
                  </TableCell>
                  
                  <TableCell>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm ${macrorouteColor.bg} ${macrorouteColor.text}`}>
                      {route.macroroute}
                    </span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden min-w-[80px]">
                        <div 
                          className={`h-full transition-all ${
                            route.coverage >= 80 ? 'bg-green-500' :
                            route.coverage >= 50 ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${route.coverage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900 min-w-[45px] text-right">
                        {route.coverage}%
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="text-sm">
                        <span className="text-gray-900">{route.timeActual}</span>
                        <span className="text-gray-400 mx-1">/</span>
                        <span className="text-gray-500">{route.timeEstimated}</span>
                      </div>
                      {timeComparison && TimeIcon && (
                        <TimeIcon className={`w-4 h-4 ${timeComparison.color}`} />
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#0E7A3B]/10 text-[#0E7A3B] text-sm">
                      {route.bags}
                    </span>
                  </TableCell>
                  
                  <TableCell>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${statusConfig.bg} ${statusConfig.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig.text}
                    </span>
                  </TableCell>
                  
                  <TableCell className="text-center">
                    {route.incidents > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-orange-50 text-orange-700 text-sm">
                        <AlertTriangle className="w-3 h-3" />
                        {route.incidents}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-[#3B82F6] hover:text-[#2563EB] hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver Detalle
                    </Button>
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