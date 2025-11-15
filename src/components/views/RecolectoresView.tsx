import { useState } from 'react';
import { Search, Phone, MapPin, TrendingUp, Calendar } from 'lucide-react';

interface Collector {
  id: number;
  name: string;
  phone: string;
  microroute: string;
  macroroute: string;
  status: 'activo' | 'inactivo' | 'licencia';
  photo: string;
  stats: {
    totalBags: number;
    avgCoverage: number;
    totalRoutes: number;
    lastActivity: string;
  };
}

// Mock data for collectors
const mockCollectors: Collector[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    phone: '+591 7123-4567',
    microroute: 'MR-01',
    macroroute: 'Verde',
    status: 'activo',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    stats: {
      totalBags: 456,
      avgCoverage: 87,
      totalRoutes: 23,
      lastActivity: 'Hoy 10:45'
    }
  },
  {
    id: 2,
    name: 'María García',
    phone: '+591 7234-5678',
    microroute: 'MR-02',
    macroroute: 'Roja',
    status: 'activo',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    stats: {
      totalBags: 398,
      avgCoverage: 82,
      totalRoutes: 21,
      lastActivity: 'Hoy 10:43'
    }
  },
  {
    id: 3,
    name: 'Carlos Mendoza',
    phone: '+591 7345-6789',
    microroute: 'MR-03',
    macroroute: 'Verde',
    status: 'activo',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    stats: {
      totalBags: 412,
      avgCoverage: 79,
      totalRoutes: 22,
      lastActivity: 'Hoy 10:40'
    }
  },
  {
    id: 4,
    name: 'Ana Rodríguez',
    phone: '+591 7456-7890',
    microroute: 'MR-04',
    macroroute: 'Naranja',
    status: 'activo',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    stats: {
      totalBags: 523,
      avgCoverage: 92,
      totalRoutes: 25,
      lastActivity: 'Hoy 10:44'
    }
  },
  {
    id: 5,
    name: 'Pedro Sánchez',
    phone: '+591 7567-8901',
    microroute: 'MR-05',
    macroroute: 'Lila',
    status: 'inactivo',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    stats: {
      totalBags: 289,
      avgCoverage: 71,
      totalRoutes: 18,
      lastActivity: 'Ayer 16:20'
    }
  },
  {
    id: 6,
    name: 'Laura Fernández',
    phone: '+591 7678-9012',
    microroute: 'MR-06',
    macroroute: 'Roja',
    status: 'activo',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    stats: {
      totalBags: 478,
      avgCoverage: 88,
      totalRoutes: 24,
      lastActivity: 'Hoy 10:42'
    }
  },
  {
    id: 7,
    name: 'Roberto Flores',
    phone: '+591 7789-0123',
    microroute: 'MR-07',
    macroroute: 'Verde',
    status: 'activo',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    stats: {
      totalBags: 367,
      avgCoverage: 76,
      totalRoutes: 19,
      lastActivity: 'Hoy 10:38'
    }
  },
  {
    id: 8,
    name: 'Sofia Torres',
    phone: '+591 7890-1234',
    microroute: 'MR-08',
    macroroute: 'Naranja',
    status: 'licencia',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    stats: {
      totalBags: 445,
      avgCoverage: 84,
      totalRoutes: 22,
      lastActivity: '13 Nov'
    }
  },
  {
    id: 9,
    name: 'Diego Vargas',
    phone: '+591 7901-2345',
    microroute: 'MR-09',
    macroroute: 'Lila',
    status: 'activo',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego',
    stats: {
      totalBags: 391,
      avgCoverage: 80,
      totalRoutes: 20,
      lastActivity: 'Hoy 10:41'
    }
  },
  {
    id: 10,
    name: 'Carmen Ruiz',
    phone: '+591 7012-3456',
    microroute: 'MR-10',
    macroroute: 'Roja',
    status: 'activo',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carmen',
    stats: {
      totalBags: 502,
      avgCoverage: 90,
      totalRoutes: 26,
      lastActivity: 'Hoy 10:46'
    }
  }
];

interface RecolectoresViewProps {
  onNavigateToMap?: (collectorId: number) => void;
}

export function RecolectoresView({ onNavigateToMap }: RecolectoresViewProps) {
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusConfig = (status: string) => {
    const configs = {
      'activo': { color: 'bg-green-500', text: 'Activo', textColor: 'text-green-700', bg: 'bg-green-50' },
      'inactivo': { color: 'bg-red-500', text: 'Inactivo', textColor: 'text-red-700', bg: 'bg-red-50' },
      'licencia': { color: 'bg-yellow-500', text: 'Licencia', textColor: 'text-yellow-700', bg: 'bg-yellow-50' }
    };
    return configs[status as keyof typeof configs];
  };

  // Filter collectors
  const filteredCollectors = mockCollectors.filter(col => {
    const matchesSearch = col.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         col.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || col.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-brand-neutral mb-1">Recolectores</h1>
          <p className="text-gray-600">
            Gestión y seguimiento de personal
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar recolector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
          >
            <option value="all">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="licencia">Licencia</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Total Recolectores</p>
            <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-brand-primary" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-brand-neutral">{mockCollectors.length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Activos Hoy</p>
            <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-brand-primary" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-brand-neutral">
            {mockCollectors.filter(c => c.status === 'activo').length}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Promedio Bolsas</p>
            <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-brand-primary" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-brand-neutral">
            {Math.round(mockCollectors.reduce((acc, c) => acc + c.stats.totalBags, 0) / mockCollectors.length)}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Cobertura Promedio</p>
            <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-brand-primary" />
            </div>
          </div>
          <p className="text-2xl font-semibold text-brand-neutral">
            {Math.round(mockCollectors.reduce((acc, c) => acc + c.stats.avgCoverage, 0) / mockCollectors.length)}%
          </p>
        </div>
      </div>

      {/* Collectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCollectors.map((collector) => (
          <div
            key={collector.id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={collector.photo}
                  alt={collector.name}
                  className="w-12 h-12 rounded-full bg-gray-200"
                />
                <div>
                  <h4 className="text-brand-neutral mb-1">{collector.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">{collector.microroute}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">{collector.macroroute}</span>
                  </div>
                </div>
              </div>
              
              <span className={`
                text-xs px-2 py-1 rounded-full
                ${collector.status === 'activo' ? 'bg-brand-primary/10 text-brand-primary' : ''}
                ${collector.status === 'inactivo' ? 'bg-gray-500/10 text-gray-700' : ''}
                ${collector.status === 'licencia' ? 'bg-yellow-500/10 text-yellow-700' : ''}
              `}>
                {collector.status.charAt(0).toUpperCase() + collector.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Bolsas Totales</p>
                <p className="font-semibold text-brand-neutral">{collector.stats.totalBags}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Cobertura Prom.</p>
                <p className="font-semibold text-brand-neutral">{collector.stats.avgCoverage}%</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Recorridos</p>
                <p className="font-semibold text-brand-neutral">{collector.stats.totalRoutes}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Última Act.</p>
                <p className="font-semibold text-brand-neutral text-xs">{collector.stats.lastActivity}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => onNavigateToMap?.(collector.id)}
                className="flex-1 px-3 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-colors text-sm font-medium"
              >
                <MapPin className="w-4 h-4 inline mr-1" />
                Ver en Mapa
              </button>
              
              <a
                href={`tel:${collector.phone}`}
                className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-neutral" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}