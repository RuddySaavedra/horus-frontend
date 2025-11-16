import { useState } from 'react';
import { Search, Filter, MapPin, Package, AlertTriangle, TrendingUp, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Recolector {
  id: number;
  name: string;
  photo: string;
  employeeId: string;
  clockId: string;
  macroroute: string;
  microroute: string;
  status: 'en-ruta' | 'fuera-ruta' | 'sin-señal';
  lastUpdate: string;
  bagsCollected: number;
  compliance: number;
  incidents: number;
}

const mockRecolectores: Recolector[] = [
  {
    id: 1,
    name: 'Ruddy Saavedra',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Pepe',
    employeeId: 'EMP-001',
    clockId: 'CLK-1234',
    macroroute: 'Verde',
    microroute: 'MR-01',
    status: 'en-ruta',
    lastUpdate: '10:45 AM',
    bagsCollected: 24,
    compliance: 85,
    incidents: 0
  },
  {
    id: 2,
    name: 'Humberto Escobar',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    employeeId: 'EMP-002',
    clockId: 'CLK-1235',
    macroroute: 'Roja',
    microroute: 'MR-02',
    status: 'en-ruta',
    lastUpdate: '10:43 AM',
    bagsCollected: 18,
    compliance: 72,
    incidents: 1
  },
  {
    id: 3,
    name: 'Matias Castellanos',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Carlos',
    employeeId: 'EMP-003',
    clockId: 'CLK-1236',
    macroroute: 'Verde',
    microroute: 'MR-03',
    status: 'fuera-ruta',
    lastUpdate: '10:40 AM',
    bagsCollected: 12,
    compliance: 45,
    incidents: 2
  },
  {
    id: 4,
    name: 'Victoria Frias',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    employeeId: 'EMP-004',
    clockId: 'CLK-1237',
    macroroute: 'Naranja',
    microroute: 'MR-04',
    status: 'en-ruta',
    lastUpdate: '10:44 AM',
    bagsCollected: 32,
    compliance: 100,
    incidents: 0
  },
  {
    id: 5,
    name: 'Laura Ortiz',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Laura',
    employeeId: 'EMP-005',
    clockId: 'CLK-1238',
    macroroute: 'Lila',
    microroute: 'MR-05',
    status: 'sin-señal',
    lastUpdate: '10:20 AM',
    bagsCollected: 8,
    compliance: 30,
    incidents: 1
  },
  {
    id: 6,
    name: 'Maria Sanchez',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luisa',
    employeeId: 'EMP-006',
    clockId: 'CLK-1239',
    macroroute: 'Roja',
    microroute: 'MR-06',
    status: 'en-ruta',
    lastUpdate: '10:42 AM',
    bagsCollected: 28,
    compliance: 90,
    incidents: 0
  },
  {
    id: 7,
    name: 'Claudio Da Silva',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    employeeId: 'EMP-007',
    clockId: 'CLK-1240',
    macroroute: 'Naranja',
    microroute: 'MR-07',
    status: 'en-ruta',
    lastUpdate: '10:46 AM',
    bagsCollected: 19,
    compliance: 68,
    incidents: 0
  },
  {
    id: 8,
    name: 'Samuel Zarate',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel',
    employeeId: 'EMP-008',
    clockId: 'CLK-1241',
    macroroute: 'Lila',
    microroute: 'MR-08',
    status: 'en-ruta',
    lastUpdate: '10:41 AM',
    bagsCollected: 22,
    compliance: 78,
    incidents: 1
  },
  {
    id: 9,
    name: 'Robert Lewandoski',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    employeeId: 'EMP-009',
    clockId: 'CLK-1242',
    macroroute: 'Verde',
    microroute: 'MR-09',
    status: 'fuera-ruta',
    lastUpdate: '10:38 AM',
    bagsCollected: 15,
    compliance: 52,
    incidents: 1
  },
  {
    id: 10,
    name: 'Leonel Messi',
    photo: 'https://api.dicebear.com/7.x/notionists/svg?seed=Leonel',
    employeeId: 'EMP-010',
    clockId: 'CLK-1243',
    macroroute: 'Roja',
    microroute: 'MR-10',
    status: 'en-ruta',
    lastUpdate: '10:47 AM',
    bagsCollected: 26,
    compliance: 88,
    incidents: 0
  },
  {
    id: 11,
    name: 'Fernando Ruiz',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando',
    employeeId: 'EMP-011',
    clockId: 'CLK-1244',
    macroroute: 'Naranja',
    microroute: 'MR-11',
    status: 'sin-señal',
    lastUpdate: '10:15 AM',
    bagsCollected: 5,
    compliance: 20,
    incidents: 0
  },
  {
    id: 12,
    name: 'Valentina Cruz',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina',
    employeeId: 'EMP-012',
    clockId: 'CLK-1245',
    macroroute: 'Lila',
    microroute: 'MR-12',
    status: 'fuera-ruta',
    lastUpdate: '10:35 AM',
    bagsCollected: 10,
    compliance: 38,
    incidents: 2
  }
];

const macrorouteColors: { [key: string]: { bg: string; text: string } } = {
  Verde: { bg: 'bg-green-100', text: 'text-green-700' },
  Roja: { bg: 'bg-red-100', text: 'text-red-700' },
  Naranja: { bg: 'bg-orange-100', text: 'text-orange-700' },
  Lila: { bg: 'bg-purple-100', text: 'text-purple-700' }
};

export function RecolectoresView() {
  const [selectedRecolector, setSelectedRecolector] = useState<Recolector | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [macrorouteFilter, setMacrorouteFilter] = useState<string>('all');

  const getStatusConfig = (status: string) => {
    const configs = {
      'en-ruta': { color: 'bg-green-500', text: 'En ruta', textColor: 'text-green-700', bg: 'bg-green-50' },
      'fuera-ruta': { color: 'bg-red-500', text: 'Fuera de ruta', textColor: 'text-red-700', bg: 'bg-red-50' },
      'sin-señal': { color: 'bg-yellow-500', text: 'Sin señal', textColor: 'text-yellow-700', bg: 'bg-yellow-50' }
    };
    return configs[status as keyof typeof configs];
  };

  // Filter recolectores
  const filteredRecolectores = mockRecolectores.filter(rec => {
    const matchesSearch = rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rec.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rec.clockId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMacroroute = macrorouteFilter === 'all' || rec.macroroute === macrorouteFilter;
    return matchesSearch && matchesMacroroute;
  });

  // Count by status
  const enRuta = filteredRecolectores.filter(r => r.status === 'en-ruta').length;
  const fueraRuta = filteredRecolectores.filter(r => r.status === 'fuera-ruta').length;
  const sinSeñal = filteredRecolectores.filter(r => r.status === 'sin-señal').length;

  return (
    <div className="flex gap-6 h-full">
      <div className="flex-1 flex flex-col gap-6">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl text-gray-900">Recolectores Activos</h2>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-green-600">{enRuta} en servicio</span>
                <span className="text-gray-400">—</span>
                <span className="text-red-600">{fueraRuta} fuera de ruta</span>
                <span className="text-gray-400">—</span>
                <span className="text-yellow-600">{sinSeñal} sin señal</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre o ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select value={macrorouteFilter} onValueChange={setMacrorouteFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las rutas</SelectItem>
                  <SelectItem value="Verde">Verde</SelectItem>
                  <SelectItem value="Roja">Roja</SelectItem>
                  <SelectItem value="Naranja">Naranja</SelectItem>
                  <SelectItem value="Lila">Lila</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex-1">
          <div className="overflow-auto h-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recolector</TableHead>
                  <TableHead>ID Empleado / Reloj</TableHead>
                  <TableHead>Macroruta</TableHead>
                  <TableHead>Microruta</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Última Actualización</TableHead>
                  <TableHead className="text-right">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecolectores.map((recolector) => {
                  const statusConfig = getStatusConfig(recolector.status);
                  const macrorouteColor = macrorouteColors[recolector.macroroute];
                  const isSelected = selectedRecolector?.id === recolector.id;

                  return (
                    <TableRow 
                      key={recolector.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
                      onClick={() => setSelectedRecolector(recolector)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={recolector.photo}
                            alt={recolector.name}
                            className="w-10 h-10 rounded-full bg-gray-200"
                          />
                          <span className="text-gray-900">{recolector.name}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm">
                          <div className="text-gray-900">{recolector.employeeId}</div>
                          <div className="text-gray-500">{recolector.clockId}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm ${macrorouteColor.bg} ${macrorouteColor.text}`}>
                          {recolector.macroroute}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="text-gray-900">{recolector.microroute}</span>
                      </TableCell>

                      <TableCell>
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${statusConfig.bg} ${statusConfig.textColor}`}>
                          <div className={`w-2 h-2 rounded-full ${statusConfig.color}`} />
                          {statusConfig.text}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="text-sm text-gray-600">{recolector.lastUpdate}</span>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecolector(recolector);
                          }}
                          className="text-[#0EA5E9] hover:text-[#0284C7] hover:bg-blue-50"
                        >
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
      </div>

      {/* Side Panel */}
      {selectedRecolector && (
          <div className="w-80 bg-white rounded-xl border border-gray-200
            p-6 flex flex-col gap-6 animate-in slide-in-from-right
            max-h-[calc(100vh-140px)]">
              {/* Contenido que puede hacer scroll */}
              <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
                  <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                          <ImageWithFallback
                              src={selectedRecolector.photo}
                              alt={selectedRecolector.name}
                              className="w-16 h-16 rounded-full bg-gray-200"
                          />
                          <div>
                              <h3 className="text-lg text-gray-900">{selectedRecolector.name}</h3>
                              <p className="text-sm text-gray-500">{selectedRecolector.employeeId}</p>
                          </div>
                      </div>
                      <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRecolector(null)}
                          className="h-8 w-8 p-0"
                      >
                          <X className="w-4 h-4" />
                      </Button>
                  </div>

                  <div className="space-y-4">
                      <div>
                          <p className="text-sm text-gray-600 mb-2">Estado Actual</p>
                          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${getStatusConfig(selectedRecolector.status).bg} ${getStatusConfig(selectedRecolector.status).textColor}`}>
          <div className={`w-2 h-2 rounded-full ${getStatusConfig(selectedRecolector.status).color}`} />
                              {getStatusConfig(selectedRecolector.status).text}
        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                  <Package className="w-4 h-4 text-[#16A34A]" />
                                  <p className="text-sm text-gray-600">Bolsas</p>
                              </div>
                              <p className="text-2xl text-gray-900">{selectedRecolector.bagsCollected}</p>
                              <p className="text-xs text-gray-500 mt-1">recolectadas hoy</p>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                  <TrendingUp className="w-4 h-4 text-[#0EA5E9]" />
                                  <p className="text-sm text-gray-600">Cumplimiento</p>
                              </div>
                              <p className="text-2xl text-gray-900">{selectedRecolector.compliance}%</p>
                              <p className="text-xs text-gray-500 mt-1">de cobertura</p>
                          </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-4 h-4 text-orange-600" />
                              <p className="text-sm text-gray-600">Incidentes Reportados</p>
                          </div>
                          <p className="text-2xl text-gray-900">{selectedRecolector.incidents}</p>
                          <p className="text-xs text-gray-500 mt-1">en esta jornada</p>
                      </div>

                      <div className="pt-4 border-t border-gray-200 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Macroruta:</span>
                              <span className={`px-2 py-1 rounded ${macrorouteColors[selectedRecolector.macroroute].bg} ${macrorouteColors[selectedRecolector.macroroute].text}`}>
            {selectedRecolector.macroroute}
          </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Microruta:</span>
                              <span className="text-gray-900">{selectedRecolector.microroute}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">ID Reloj:</span>
                              <span className="text-gray-900">{selectedRecolector.clockId}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Última actualización:</span>
                              <span className="text-gray-900">{selectedRecolector.lastUpdate}</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Botón fijo abajo */}
              <Button className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white mt-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Ver en Mapa
              </Button>
          </div>

      )}
    </div>
  );
}