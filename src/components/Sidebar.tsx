import { Users, Route, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'recorridos', label: 'Recorridos', icon: Route },
    { id: 'recolectores', label: 'Recolectores', icon: Users },
  ];

  return (
    <aside className="w-16 md:w-20 bg-brand-primary-dark border-r border-white/10 flex flex-col items-center py-4 md:py-6 gap-3 md:gap-4">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeView === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`
              w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all
              ${isActive 
                ? 'bg-brand-primary text-white shadow-lg' 
                : 'text-white/60 hover:bg-white/10 hover:text-white'
              }
            `}
            title={item.label}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        );
      })}
    </aside>
  );
}