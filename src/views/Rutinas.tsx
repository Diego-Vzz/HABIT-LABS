import { useState, useEffect } from 'react';
import { CheckCircle2, CircleDashed, Loader2, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../shared/lib/constants/routes';

interface Ejercicio {
    id: number;
    nombre: string;
    peso: string;
    completado: boolean;
}

interface Rutina {
    id: number;
    nombre: string;
    ejercicios: Ejercicio[];
}

export default function Rutinas() {
    const [isLoading, setIsLoading] = useState(true);
    const [rutinas, setRutinas] = useState<Rutina[]>([]);

    useEffect(() => {
        // Simular carga inicial desde base de datos / backend
        const timer = setTimeout(() => {
            setRutinas([]); // Por defecto el usuario no tiene plan
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className='flex flex-col gap-4 flex-1'>
            <div className='flex flex-col flex-1'>
                <span className='text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wider flex-1'>
                    DATOS
                </span>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#1C1C22] rounded-2xl p-5 border border-gray-800 hover:border-gray-600 transition duration-200">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Sesión actual</p>
                        <p className="text-white text-2xl font-bold">0%</p>
                    </div>
                    <div className="bg-[#1C1C22] rounded-2xl p-5 border border-gray-800 hover:border-gray-600 transition duration-200">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Cronometro</p>
                        <p className="text-white text-xl font-bold mt-1">00:00:00</p>
                    </div>
                    <div className="bg-[#1C1C22] rounded-2xl p-5 border border-gray-800 hover:border-gray-600 transition duration-200">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">RACHA</p>
                        <p className="text-white text-xl font-bold mt-1">0 días</p>
                    </div>
                    <div className="bg-[#1C1C22] rounded-2xl p-5 border border-gray-800 hover:border-gray-600 transition duration-200">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Volumen Sem.</p>
                        <p className="text-white text-xl font-bold mt-1">0 vol</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                <span className='text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wider'>
                    RUTINAS
                </span>
                {isLoading ? (
                    <div className="bg-[#1C1C22] rounded-3xl p-6 border border-gray-800 flex flex-col items-center justify-center py-16 gap-4">
                        <Loader2 className="size-8 text-[#A890FE] animate-spin" />
                        <p className="text-gray-400 font-medium">Cargando información...</p>
                    </div>
                ) : rutinas.length === 0 ? (
                    <div className="bg-[#1C1C22] rounded-3xl p-6 border border-gray-800 flex flex-col items-center justify-center py-16 gap-4 text-center">
                        <Dumbbell className="size-12 text-gray-600 mb-2" />
                        <h3 className="text-xl font-bold text-white">Sin rutinas</h3>
                        <p className="text-gray-400 text-sm max-w-[250px]">Aún no has creado un plan de entrenamiento. ¡Comienza ahora!</p>
                        <Link to={ROUTES.CREAR_PLAN} className="mt-4 inline-block bg-white text-black hover:bg-gray-200 font-bold py-3 px-6 rounded-full transition duration-200 transform active:scale-95">
                            Crear Plan
                        </Link>
                    </div>
                ) : (
                    <div className="bg-[#1C1C22] rounded-3xl p-6 border-l-4 border-l-[#A890FE] border-y border-r border-gray-800 mb-6">
                        <h3 className="text-2xl font-bold mb-5 text-white">{rutinas[0].nombre}</h3>

                        <ul className="space-y-4 mb-8">
                            {rutinas[0].ejercicios.map((ejercicio) => (
                                <li key={ejercicio.id} className={`flex justify-between items-center bg-[#15151A] p-3 rounded-xl border ${ejercicio.completado ? 'border-gray-800' : 'border-[#A890FE]'}`}>
                                    <div className="flex gap-3 items-center">
                                        {ejercicio.completado ? (
                                            <CheckCircle2 className="size-5 text-green-500" />
                                        ) : (
                                            <CircleDashed className='text-[#A890FE] size-5' />
                                        )}
                                        <span className={`text-sm font-medium ${ejercicio.completado ? 'text-gray-300' : 'text-[#A890FE] font-bold'}`}>
                                            {ejercicio.nombre}
                                        </span>
                                    </div>
                                    <span className={`text-sm font-bold ${ejercicio.completado ? 'text-white' : 'text-[#A890FE]'}`}>
                                        {ejercicio.peso}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full bg-[#A890FE] hover:bg-[#A890FE] text-black font-bold py-4 rounded-xl transition duration-200 transform active:scale-95">
                            Ver Rutina
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}