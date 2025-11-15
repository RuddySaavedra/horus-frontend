import { Route, Target, Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface Microroute {
  status: 'En progreso' | 'Completada' | 'Desviada';
  coverage: number;
  bags: number;
  incidents: number;
}

interface KPICardsProps {
  microroutes: Microroute[];
}

export function KPICards({ microroutes }: KPICardsProps) {
  const activeRoutes = microroutes.filter(m => m.status === 'En progreso').length;
  const avgCoverage = microroutes.length > 0 
    ? Math.round(microroutes.reduce((sum, m) => sum + m.coverage, 0) / microroutes.length)
    : 0;
  const totalBags = microroutes.reduce((sum, m) => sum + m.bags, 0);
  const activeIncidents = microroutes.reduce((sum, m) => sum + m.incidents, 0);

  const kpis = [
    {
      id: 'routes',
      title: 'Microrutas Activas',
      value: activeRoutes,
      subtitle: `de ${microroutes.length} asignadas`,
      icon: Route,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trend: '+2',
      trendUp: true
    },
    {
      id: 'coverage',
      title: 'Cobertura Promedio',
      value: `${avgCoverage}%`,
      subtitle: 'del día',
      icon: Target,
      iconBg: 'bg-green-100',
      iconColor: 'text-brand-primary',
      trend: '+5%',
      trendUp: true
    },
    {
      id: 'bags',
      title: 'Bolsas Recolectadas',
      value: totalBags,
      subtitle: 'total del día',
      icon: Package,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      trend: '+12',
      trendUp: true
    },
    {
      id: 'incidents',
      title: 'Incidentes Activos',
      value: activeIncidents,
      subtitle: 'requieren atención',
      icon: AlertTriangle,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      trend: '-1',
      trendUp: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const TrendIcon = kpi.trendUp ? TrendingUp : TrendingDown;
        
        return (
          <div
            key={kpi.id}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{kpi.title}</p>
                <p className="text-4xl text-brand-neutral mb-1">{kpi.value}</p>
                <p className="text-sm text-gray-500">{kpi.subtitle}</p>
              </div>
              
              <div className={`w-12 h-12 rounded-xl ${kpi.iconBg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-1">
              <TrendIcon className={`w-4 h-4 ${kpi.trendUp ? 'text-brand-primary' : 'text-red-600'}`} />
              <span className={`text-sm ${kpi.trendUp ? 'text-brand-primary' : 'text-red-600'}`}>
                {kpi.trend}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs ayer</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}