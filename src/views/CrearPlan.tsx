import { ChevronLeft, Plus, Trash2, ClockCheck, Link2, Flame, Zap, ClipboardClock, ClockPlus, NotebookPen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../shared/lib/constants/routes';

import {
    useCrearPlan,
    ExerciseSearchModal,
    SetTypeModal,
    RestTimeModal,
    SwipeToDelete,
    NoteModal
} from '../modules/crearPlan';

export default function CrearPlan() {
    const { state, actions } = useCrearPlan();

    const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    return (
        <section className="flex flex-col gap-6 flex-1 w-full pb-20">
            {/* Cabecera */}
            <div className="flex items-center justify-between mb-2">
                <Link to={ROUTES.HOME} className="text-gray-400 hover:text-white transition p-2 -ml-2 rounded-xl hover:bg-[#1C1C22]">
                    <ChevronLeft className="size-6" />
                </Link>
                <input
                    type="text"
                    placeholder="Titulo"
                    className="bg-transparent text-xl font-bold text-center text-white outline-none w-32 placeholder-gray-400"
                    defaultValue="Titulo"
                />
                <button className="bg-[#A890FE] hover:bg-[#977afc] text-black font-bold py-2 px-4 rounded-xl text-sm transition transform active:scale-95">
                    Guardar
                </button>
            </div>

            {/* Selector de días */}
            <div className="flex justify-between items-center px-1">
                {dayLabels.map((label, idx) => {
                    const isSelected = state.activeDayIndex === idx;
                    const hasExercises = state.daysData[idx].length > 0;
                    return (
                        <div key={idx} className="flex flex-col items-center gap-1 relative">
                            {hasExercises && !isSelected && (
                                <div className="w-1 h-1 bg-[#A890FE] rounded-full absolute -top-1 right-0"></div>
                            )}
                            <button 
                                onClick={() => actions.handleDayChange(idx)}
                                className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition
                                ${isSelected ? 'bg-[#A890FE] text-black' : 'text-gray-400 hover:text-white hover:bg-[#1C1C22]'}`}>
                                {label}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Selectores circulares (cuerpo) */}
            <div className="flex gap-3 mt-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                {state.selectedExercises.map((exercise, idx) => (
                    <button
                        key={`${exercise.id}-${idx}`}
                        onClick={() => actions.setActiveExerciseIndex(idx)}
                        className={`size-10 shrink-0 rounded-full flex items-center justify-center transition border ${state.activeExerciseIndex === idx
                            ? 'border-[#A890FE] bg-[#2D264B]/40'
                            : 'border-gray-600 bg-transparent hover:bg-gray-800'
                            }`}
                    >
                        <span className={`text-[10px] font-bold tracking-wider ${state.activeExerciseIndex === idx ? 'text-[#A890FE]' : 'text-gray-500'}`}>
                            IMG
                        </span>
                    </button>
                ))}
                <button
                    onClick={() => actions.setIsSearchModalOpen(true)}
                    className="size-10 shrink-0 rounded-full border border-dashed border-gray-600 bg-transparent flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition"
                >
                    <Plus className="size-5" />
                </button>
            </div>

            {/* Áreas del cuerpo trabajadas (Placeholder) */}
            <div className="bg-[#15151A] border border-gray-800 rounded-xl h-56 flex items-center justify-center mt-2">
                <p className="text-gray-300 text-lg">Áreas del cuerpo trabajadas</p>
            </div>

            {/* Ejercicio info */}
            <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <span className="bg-[#2D264B] text-[#A890FE] font-bold text-xs py-1.5 px-2 rounded-lg flex items-center justify-center tracking-wide">
                                {state.activeExerciseIndex !== null ? `0/${state.selectedExercises[state.activeExerciseIndex].sets.length}` : '0/0'}
                            </span>
                            <h4 className="text-white font-bold text-md leading-tight max-w-[220px]">
                                {state.activeExerciseIndex !== null ? state.selectedExercises[state.activeExerciseIndex].name : 'Ejercicio no seleccionado'}
                            </h4>
                        </div>
                        {state.activeExerciseIndex !== null && (
                            <p className="text-gray-400 text-sm mt-1 px-1">
                                Tiempo de descanso: 00:00:00
                            </p>
                        )}
                    </div>
                    {state.activeExerciseIndex !== null && (() => {
                        const currentEx = state.selectedExercises[state.activeExerciseIndex];
                        const allHaveRest = currentEx.sets.length > 0 && currentEx.sets.every(s => s.restTime.h !== '00' || s.restTime.m !== '00' || s.restTime.s !== '00');
                        return (
                            <div className="flex items-center gap-1 -mr-2">
                                {currentEx.sets.length > 0 && (
                                    <button
                                        onClick={actions.handleOpenGlobalRest}
                                        className={`transition p-2 rounded-lg ${allHaveRest ? 'text-emerald-500 hover:text-emerald-400 bg-emerald-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                                    >
                                        <ClipboardClock className="size-5" />
                                    </button>
                                )}
                                <button
                                    onClick={actions.handleDeleteExercise}
                                    className="text-red-500/80 hover:text-red-500 transition p-2 hover:bg-red-500/10 rounded-lg"
                                >
                                    <Trash2 className="size-5" />
                                </button>
                            </div>
                        );
                    })()}
                </div>
                {state.activeExerciseIndex !== null && (
                    <>
                        {/* Headers tabla */}
                        <div className="grid grid-cols-[auto_1fr_1fr_1fr] text-[10px] font-bold text-gray-400 mt-2 tracking-wider items-center text-center">
                            <span className="w-10"></span>
                            <span className="text-left pl-2">OPCIONES</span>
                            <span>KG</span>
                            <span>REPS</span>
                        </div>

                        {/* Series list */}
                        <div className="flex flex-col gap-3">
                            {state.selectedExercises[state.activeExerciseIndex].sets.map((set, setIdx) => {
                                const isSwipeDisabled = state.selectedExercises[state.activeExerciseIndex!].sets.length <= 1;
                                return (
                                <SwipeToDelete
                                    key={set.id}
                                    disabled={isSwipeDisabled}
                                    onDelete={() => actions.handleDeleteSet(setIdx)}
                                >
                                    <div className="grid grid-cols-[auto_1fr_1fr_1fr] items-center text-sm text-gray-400 py-1">
                                        <div className="flex justify-center w-10">
                                            <button
                                                onClick={() => actions.setActiveSetForType(setIdx)}
                                                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition ${set.type === 'warmup' ? 'bg-orange-500/20 text-orange-500' :
                                                    set.type === 'failure' ? 'bg-red-500/20 text-red-500' :
                                                        'bg-[#1C1C22] text-gray-400 border border-gray-800'
                                                    }`}
                                            >
                                                {set.type === 'normal' && (setIdx + 1)}
                                                {set.type === 'warmup' && <Flame className="size-4" />}
                                                {set.type === 'failure' && <Zap className="size-4" />}
                                            </button>
                                        </div>
                                        <div className="flex gap-2 items-center text-left pl-2">
                                            {set.restTime.h !== '00' || set.restTime.m !== '00' || set.restTime.s !== '00' ? (
                                                <ClockCheck
                                                    className="size-4 hover:text-emerald-400 cursor-pointer transition text-emerald-500"
                                                    onClick={() => actions.setActiveSetForRest(setIdx)}
                                                />
                                            ) : (
                                                <ClockPlus
                                                    className="size-4 hover:text-white cursor-pointer transition text-gray-500"
                                                    onClick={() => actions.setActiveSetForRest(setIdx)}
                                                />
                                            )}
                                            {/* <Link2 className="size-4 hover:text-white cursor-pointer transition text-gray-500" /> */}
                                            <NotebookPen 
                                                className={`size-4 cursor-pointer transition ${set.note && set.note.trim() !== '' ? 'text-emerald-500 hover:text-emerald-400' : 'text-gray-500 hover:text-white'}`}
                                                onClick={() => actions.setActiveSetForNote(setIdx)}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <input
                                                type="text"
                                                inputMode="decimal"
                                                placeholder="-"
                                                className="w-12 bg-transparent text-center text-white outline-none placeholder-gray-600 font-bold"
                                                value={set.kg}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (/^\d*\.?\d{0,2}$/.test(val)) {
                                                        actions.updateSet(setIdx, 'kg', val);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                placeholder="-"
                                                className="w-12 bg-transparent text-center text-white outline-none placeholder-gray-600 font-bold"
                                                value={set.reps}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (/^\d*$/.test(val)) {
                                                        actions.updateSet(setIdx, 'reps', val);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </SwipeToDelete>
                                );
                            })}
                        </div>

                        {/* Añadir serie */}
                        <button
                            onClick={actions.handleAddSet}
                            className="w-full bg-[#1C1C22] hover:bg-[#25252c] border border-gray-800 text-gray-300 text-sm font-medium py-3.5 rounded-xl transition flex items-center justify-center gap-2 transform active:scale-95 mt-2"
                        >
                            <Plus className="size-4" />
                            Añadir serie
                        </button>
                    </>
                )}
            </div>

            {/* Modales modulares */}
            <ExerciseSearchModal
                isOpen={state.isSearchModalOpen}
                onClose={() => actions.setIsSearchModalOpen(false)}
                onSelectExercise={(exercise) => {
                    const newSet = { 
                        id: Date.now().toString() + Math.random(), 
                        kg: '', 
                        reps: '', 
                        type: 'normal' as const,
                        restTime: { h: '00', m: '00', s: '00' }
                    };
                    actions.setSelectedExercises([...state.selectedExercises, { ...exercise, sets: [newSet] }]);
                    actions.setActiveExerciseIndex(state.selectedExercises.length);
                    actions.setIsSearchModalOpen(false);
                }}
            />

            <SetTypeModal
                isOpen={state.activeSetForType !== null}
                onClose={() => actions.setActiveSetForType(null)}
                onSelectType={(type) => {
                    if (state.activeSetForType !== null) {
                        actions.updateSet(state.activeSetForType, 'type', type);
                    }
                }}
            />

            {state.activeSetForRest !== null && state.activeExerciseIndex !== null && (
                <RestTimeModal
                    isOpen={true}
                    onClose={actions.handleCloseRestTimeModal}
                    restTime={state.selectedExercises[state.activeExerciseIndex].sets[state.activeSetForRest].restTime}
                    onChange={actions.handleRestChange}
                />
            )}

            {state.isGlobalRestTimeOpen && (
                <RestTimeModal
                    isOpen={true}
                    onClose={actions.handleCloseGlobalRestTimeModal}
                    restTime={state.globalRestTime}
                    onChange={actions.handleGlobalRestChange}
                />
            )}

            {state.activeSetForNote !== null && state.activeExerciseIndex !== null && (
                <NoteModal
                    isOpen={true}
                    initialNote={state.selectedExercises[state.activeExerciseIndex].sets[state.activeSetForNote].note || ''}
                    onClose={(note) => {
                        actions.updateSet(state.activeSetForNote as number, 'note', note);
                        actions.setActiveSetForNote(null);
                    }}
                />
            )}
        </section>
    );
}
