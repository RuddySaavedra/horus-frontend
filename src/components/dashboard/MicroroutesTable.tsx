import { AlertCircle} from 'lucide-react';

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
  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return 'text-brand-primary bg-brand-primary/10';
    if (coverage >= 50) return 'text-yellow-600 bg-yellow-500/10';
    return 'text-red-600 bg-red-500/10';
  };

  const getStatusColor = (status: Microroute['status']) => {
    switch (status) {
      case 'Completada':
        return 'text-brand-primary bg-brand-primary/10 border-brand-primary/20';
      case 'En progreso':
        return 'text-brand-primary bg-brand-primary/10 border-brand-primary/20';
      case 'Desviada':
        return 'text-yellow-600 bg-yellow-500/10 border-yellow-500/20';
      default:
        return 'text-gray-600 bg-gray-500/10 border-gray-500/20';
    }
  };

  if (microroutes.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-brand-neutral">Detalle de Microrutas</h3>
        </div>
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-brand-neutral mb-2">No hay microrutas seleccionadas</h4>
          <p className="text-gray-600 text-sm">
            Selecciona al menos una macroruta en el filtro superior para ver los datos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-brand-neutral">Detalle de Microrutas</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Microruta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Recolector
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Cobertura
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Tiempo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Bolsas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Incidencias
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {microroutes.map((microroute) => (
              <tr key={microroute.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getMacrorouteColor(microroute.macroroute) }}
                    />
                    <span className="font-medium text-brand-neutral">{microroute.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900">{microroute.collector}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-brand-primary rounded-full transition-all"
                        style={{ width: `${microroute.coverage}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded ${getCoverageColor(microroute.coverage)}`}>
                      {microroute.coverage}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <div className="text-gray-900">{microroute.timeActual}</div>
                    <div className="text-gray-500 text-xs">Est: {microroute.timeEstimated}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-brand-neutral">{microroute.bags}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(microroute.status)}`}>
                    {microroute.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {microroute.incidents > 0 && (
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    )}
                    <span className={microroute.incidents > 0 ? 'text-yellow-600 font-medium' : 'text-gray-500'}>
                      {microroute.incidents}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getMacrorouteColor(macroroute: string) {
  const color = macrorouteColors[macroroute];
  return color ? color.bg.replace('bg-', '') : 'gray-300';
}