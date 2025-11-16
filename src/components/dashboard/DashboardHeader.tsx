import { Calendar } from 'lucide-react';
import { Package } from 'lucide-react';

interface Microroute {
  status: 'En progreso' | 'Completada' | 'Desviada';
  incidents: number;
}

interface DashboardHeaderProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedMacroroutes: string[];
  toggleMacroroute: (macroroute: string) => void;
  microroutes: Microroute[];
}

const macroroutes = [
  { name: 'Verde', color: '#10B981' },
  { name: 'Roja', color: '#EF4444' },
  { name: 'Naranja', color: '#F97316' },
  { name: 'Lila', color: '#A855F7' },
];

export function DashboardHeader({ 
  selectedDate, 
  setSelectedDate, 
  selectedMacroroutes, 
  toggleMacroroute,
}: DashboardHeaderProps) {

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl text-brand-neutral">Sistema de Supervisión</h1>
            <p className="text-xs md:text-sm text-gray-600">Swisscontact + Emacruz</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Date Selector */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white text-sm w-full sm:w-auto"
            />
          </div>

          {/* Macroroute Filters */}
          <div className="flex flex-wrap gap-2">
            {macroroutes.map((macroroute) => {
              const isSelected = selectedMacroroutes.includes(macroroute.name);
              return (
                <button
                  key={macroroute.name}
                  onClick={() => toggleMacroroute(macroroute.name)}
                  className={`
                    px-3 py-2 rounded-lg border transition-all text-sm font-medium
                    ${isSelected
                      ? 'border-transparent text-white shadow-sm'
                      : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
                    }
                  `}
                  style={isSelected ? { backgroundColor: macroroute.color } : {}}
                >
                  {macroroute.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}