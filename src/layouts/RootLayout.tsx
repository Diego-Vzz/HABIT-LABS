import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../shared/lib/constants/routes';
import { Dumbbell, Scale } from 'lucide-react';

export default function RootLayout() {
  const location = useLocation();

  // ScrollToTop automático al cambiar de ruta
  useEffect(() => {
    // Asegurarnos de alcanzar cualquier contenedor que esté manejando el scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    const root = document.getElementById('root');
    if (root) {
      root.scrollTop = 0;
    }
  }, [location.pathname]);

  // Definición de las secciones de navegación
  const navItems = [
    {
      id: 'pr-tool',
      label: 'PR Tool',
      icon: Scale,
      path: ROUTES.PR_TOOL,
      activePaths: [ROUTES.PR_TOOL], // Vistas que activan esta sección
    },
    {
      id: 'entreno',
      label: 'Entreno',
      icon: Dumbbell,
      path: ROUTES.HOME,
      activePaths: [ROUTES.HOME, ROUTES.CREAR_PLAN], // Crear Plan mantiene activa la sección Entreno
    }
  ];

  return (
    <>
      <main className='flex flex-col py-8 px-4 text-stone-200 flex-1'>
        <header className='flex items-center w-full'>
          <h1 className="text-3xl font-bold mb-4 tracking-tight">HabitLab</h1>
        </header>
        <Outlet />
      </main>
      <footer className='w-full flex flex-row justify-center items-center pb-4 sticky bottom-0 z-40'>
        <div className='bg-[#1C1C22] border border-gray-700 w-11/12 max-w-[380px] rounded-full py-2 px-4 flex justify-between items-center shadow-2xl pointer-events-auto gap-2'>
          {navItems.map((item) => {
            const isActive = item.activePaths.includes(location.pathname);
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.id}
                to={item.path} 
                className={
                  `rounded-full font-bold transition flex items-center gap-2 flex-1 justify-center transform active:scale-95 
                  ${isActive 
                    ? "text-stone-950 bg-white px-6 py-3" 
                    : "text-gray-400 hover:text-white bg-white/0 p-3"
                  }`
                }
              >
                <Icon />
                {isActive && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </footer>
    </>
  );
}