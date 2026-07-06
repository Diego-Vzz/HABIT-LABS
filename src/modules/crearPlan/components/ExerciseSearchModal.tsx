import { useState } from 'react';
import { X, Search, Filter, Plus } from 'lucide-react';
import { Exercise } from '../types';
import { mockExercises } from '../utils/constants';

interface ExerciseSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectExercise: (exercise: Exercise) => void;
}

export function ExerciseSearchModal({ isOpen, onClose, onSelectExercise }: ExerciseSearchModalProps) {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#0F0F13] z-50 flex flex-col p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Añadir Ejercicio</h2>
                <button 
                    onClick={onClose}
                    className="p-2 bg-[#1C1C22] rounded-full text-gray-400 hover:text-white transition"
                >
                    <X className="size-5" />
                </button>
            </div>

            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
                <input 
                    type="text" 
                    placeholder="Buscar ejercicio..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#1C1C22] text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-1 focus:ring-[#A890FE] placeholder-gray-500 transition"
                />
            </div>

            <div className="flex mb-6">
                <button className="flex items-center gap-2 bg-[#1C1C22] hover:bg-[#25252c] text-gray-300 px-4 py-2 rounded-xl text-sm font-medium transition transform active:scale-95">
                    <Filter className="size-4" />
                    Músculo
                </button>
            </div>

            <div className="flex flex-col gap-3 overflow-y-auto pb-4">
                {mockExercises
                    .filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(exercise => (
                        <button 
                            key={exercise.id} 
                            onClick={() => {
                                onSelectExercise(exercise);
                                setSearchTerm('');
                            }}
                            className="flex items-center gap-4 bg-[#1C1C22] p-4 rounded-xl hover:bg-[#25252c] transition text-left group transform active:scale-[0.98] w-full"
                        >
                            <div className="w-12 h-12 shrink-0 rounded-full bg-[#2D264B]/40 border border-[#A890FE]/20 flex items-center justify-center">
                                <span className="text-[#A890FE]/40 text-[10px] font-bold tracking-wider">IMG</span>
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-sm">{exercise.name}</h3>
                                <p className="text-gray-400 text-xs mt-1.5 leading-snug">
                                    {exercise.description}
                                </p>
                            </div>

                            <div className="shrink-0 pl-2">
                                <Plus className="text-[#A890FE] size-5 opacity-0 group-hover:opacity-100 transition" />
                            </div>
                        </button>
                    ))
                }
                {mockExercises.filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                    <div className="text-center text-gray-500 mt-10 text-sm">
                        No se encontraron ejercicios.
                    </div>
                )}
            </div>
        </div>
    );
}
