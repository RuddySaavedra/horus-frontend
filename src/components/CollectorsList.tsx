import { Circle, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Collector {
  id: number;
  name: string;
  photo: string;
  microroute: string;
  status: 'en-ruta' | 'fuera-ruta' | 'sin-señal';
  lastUpdate: string;
}

interface CollectorsListProps {
  collectors: Collector[];
  selectedCollector: number | null;
  onSelectCollector: (id: number) => void;
}

export function CollectorsList({ collectors, selectedCollector, onSelectCollector }: CollectorsListProps) {
  const getStatusConfig = (status: string) => {
    const configs = {
      'en-ruta': { color: 'bg-brand-primary', text: 'En ruta', textColor: 'text-brand-primary', bgLight: 'bg-brand-primary/10', borderColor: 'border-brand-primary/20' },
      'fuera-ruta': { color: 'bg-red-500', text: 'Fuera de ruta', textColor: 'text-red-700', bgLight: 'bg-red-500/10', borderColor: 'border-red-500/20' },
      'sin-señal': { color: 'bg-yellow-500', text: 'Sin señal', textColor: 'text-yellow-700', bgLight: 'bg-yellow-500/10', borderColor: 'border-yellow-500/20' }
    };
    return configs[status as keyof typeof configs];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden h-full">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-brand-neutral">Recolectores Activos</h3>
        <p className="text-sm text-gray-500 mt-1">{collectors.length} en servicio</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {collectors.map((collector) => {
          const statusConfig = getStatusConfig(collector.status);
          const isSelected = selectedCollector === collector.id;

          return (
            <button
              key={collector.id}
              onClick={() => onSelectCollector(collector.id)}
              className={`
                w-full px-4 py-3 border-b border-gray-100 hover:bg-brand-primary/5 transition-colors text-left border-l-2
                ${isSelected 
                  ? `${statusConfig.bgLight} border-l-brand-primary` 
                  : 'border-l-transparent'
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <ImageWithFallback
                    src={collector.photo}
                    alt={collector.name}
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusConfig.color} rounded-full border-2 border-white`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-brand-neutral truncate font-medium">{collector.name}</p>
                  <p className="text-sm text-gray-500">{collector.microroute}</p>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs ${statusConfig.textColor}`}>
                      {statusConfig.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{collector.lastUpdate}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Circle className="w-3 h-3 fill-brand-primary text-brand-primary" />
            <span className="text-gray-600">En ruta: {collectors.filter(c => c.status === 'en-ruta').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-3 h-3 fill-red-500 text-red-500" />
            <span className="text-gray-600">Fuera: {collectors.filter(c => c.status === 'fuera-ruta').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span className="text-gray-600">Sin señal: {collectors.filter(c => c.status === 'sin-señal').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}