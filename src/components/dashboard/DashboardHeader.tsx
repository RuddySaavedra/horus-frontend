import {  AlertCircle } from 'lucide-react';
import checkIcon from '../../assets/img.png';
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

const macrorouteColors: { [key: string]: { bg: string; text: string; border: string } } = {
  Verde: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500' },
  Roja: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500' },
  Naranja: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500' },
  Lila: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-500' }
};

export function DashboardHeader({
  selectedMacroroutes,
  toggleMacroroute,
  microroutes 
}: DashboardHeaderProps) {
  const inProgress = microroutes.filter(m => m.status === 'En progreso').length;
  const completed = microroutes.filter(m => m.status === 'Completada').length;
  const totalIncidents = microroutes.reduce((sum, m) => sum + m.incidents, 0);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-sm">
              <img src={checkIcon} alt="icono" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl text-brand-neutral">Track Me</h1>
            <p className="text-sm text-gray-500">Swisscontact & Emacruz</p>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex items-center gap-6">
          {/* Date Picker */}

          {/* Macroroute Chips */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-brand-neutral">Macrorutas:</span>
            {Object.keys(macrorouteColors).map((macroroute) => {
              const isSelected = selectedMacroroutes.includes(macroroute);
              const colors = macrorouteColors[macroroute];
              
              return (
                <button
                  key={macroroute}
                  onClick={() => toggleMacroroute(macroroute)}
                  className={`
                    px-4 py-2 rounded-lg text-sm transition-all border-2
                    ${isSelected 
                      ? `${colors.bg} ${colors.text} ${colors.border}` 
                      : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                    }
                  `}
                >
                  {macroroute}
                </button>
              );
            })}
          </div>

          {/* Status Badge */}
          <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm">
              <span className="text-brand-neutral">Hoy: </span>
              <span className="text-brand-primary">{inProgress} en progreso</span>
              <span className="text-gray-400 mx-1">|</span>
              <span className="text-brand-neutral">{completed} completada{completed !== 1 ? 's' : ''}</span>
              {totalIncidents > 0 && (
                <>
                  <span className="text-gray-400 mx-1">|</span>
                  <span className="text-orange-600 inline-flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {totalIncidents} incidente{totalIncidents !== 1 ? 's' : ''}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}