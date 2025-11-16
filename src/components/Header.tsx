import { Calendar} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface HeaderProps {
  selectedMacroroute: string;
  setSelectedMacroroute: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
}

export function Header({ 
  selectedMacroroute, 
  setSelectedMacroroute,
  selectedDate,
  setSelectedDate 
}: HeaderProps) {
  return (
    <header className="h-20 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#16A34A] rounded-lg flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L8 8V14C8 19.55 11.84 24.74 16 26C20.16 24.74 24 19.55 24 14V8L16 4Z" fill="white"/>
              <path d="M14 18L11 15L9.59 16.41L14 20.82L22.41 12.41L21 11L14 18Z" fill="#16A34A"/>
            </svg>
          </div>
          <div>
            <h1 className="text-gray-900">Sistema de Microrutas</h1>
            <p className="text-sm text-gray-500">Swisscontact + Emacruz</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
          />
        </div>

        <Select value={selectedMacroroute} onValueChange={setSelectedMacroroute}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar macroruta" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Roja">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                Macroruta Roja
              </div>
            </SelectItem>
            <SelectItem value="Verde">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                Macroruta Verde
              </div>
            </SelectItem>
            <SelectItem value="Naranja">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                Macroruta Naranja
              </div>
            </SelectItem>
            <SelectItem value="Lila">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                Macroruta Lila
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="text-[#16A34A]">4 microrutas en progreso</span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-gray-500">1 completada</span>
          </p>
        </div>
      </div>
    </header>
  );
}
