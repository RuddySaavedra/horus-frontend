import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,  Area, AreaChart } from 'recharts';

interface Microroute {
  macroroute: string;
  bags: number;
  status: 'En progreso' | 'Completada' | 'Desviada';
  coverage: number;
}

interface ChartsSectionProps {
  microroutes: Microroute[];
}

export function ChartsSection({ microroutes }: ChartsSectionProps) {
  // Data for bags by macroroute
  const bagsData = ['Verde', 'Roja', 'Naranja', 'Lila'].map(macroroute => ({
    name: macroroute,
    bolsas: microroutes
      .filter(m => m.macroroute === macroroute)
      .reduce((sum, m) => sum + m.bags, 0)
  }));

  // Data for 7-day trend
  const trendData = [
    { day: 'Lun', cumplimiento: 78 },
    { day: 'Mar', cumplimiento: 82 },
    { day: 'Mié', cumplimiento: 75 },
    { day: 'Jue', cumplimiento: 88 },
    { day: 'Vie', cumplimiento: 85 },
    { day: 'Sáb', cumplimiento: 92 },
    { day: 'Dom', cumplimiento: 87 }
  ];

  // Data for status distribution
  const statusCounts = {
    'Completada': microroutes.filter(m => m.status === 'Completada').length,
    'En progreso': microroutes.filter(m => m.status === 'En progreso').length,
    'Desviada': microroutes.filter(m => m.status === 'Desviada').length
  };

  const statusData = [
    { name: 'Completadas', value: statusCounts['Completada'], color: '#10813F' },
    { name: 'En progreso', value: statusCounts['En progreso'], color: '#3B82F6' },
    { name: 'Desviadas', value: statusCounts['Desviada'], color: '#EF4444' }
  ].filter(item => item.value > 0);

  const macrorouteColors: { [key: string]: string } = {
    Verde: '#10813F',
    Roja: '#EF4444',
    Naranja: '#F97316',
    Lila: '#A855F7'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bar Chart - Bags by Macroroute */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm lg:col-span-2">
        <div className="mb-6">
          <h3 className="text-lg text-brand-neutral">Bolsas Recolectadas por Macroruta</h3>
          <p className="text-sm text-gray-500 mt-1">Comparativo del día de hoy</p>
        </div>
        
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={bagsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#3A454B', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#3A454B', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar 
              dataKey="bolsas" 
              fill="#10813F" 
              radius={[8, 8, 0, 0]}
              shape={(props: any) => {
                const { x, y, width, height, payload } = props;
                const color = macrorouteColors[payload.name] || '#10813F';
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={color}
                    rx={8}
                    ry={8}
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donut Chart - Status Distribution */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg text-brand-neutral">Estado de Microrutas</h3>
          <p className="text-sm text-gray-500 mt-1">Distribución actual</p>
        </div>
        
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-4 space-y-2">
          {statusData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <span className="text-sm text-brand-neutral">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Area Chart - 7-Day Trend */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm lg:col-span-3">
        <div className="mb-6">
          <h3 className="text-lg text-brand-neutral">Tendencia de Cumplimiento</h3>
          <p className="text-sm text-gray-500 mt-1">Últimos 7 días</p>
        </div>
        
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorCumplimiento" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10813F" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10813F" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="day" 
              tick={{ fill: '#3A454B', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#3A454B', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value) => [`${value}%`, 'Cumplimiento']}
            />
            <Area 
              type="monotone" 
              dataKey="cumplimiento" 
              stroke="#10813F" 
              strokeWidth={2}
              fill="url(#colorCumplimiento)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}