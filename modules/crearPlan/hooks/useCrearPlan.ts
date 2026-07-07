import { useState } from 'react';
import { SelectedExercise } from '../types';

export function useCrearPlan() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [activeDayIndex, setActiveDayIndex] = useState(0);
    const [daysData, setDaysData] = useState<SelectedExercise[][]>([[], [], [], [], [], [], []]);

    const selectedExercises = daysData[activeDayIndex];

    const setSelectedExercises = (updated: SelectedExercise[]) => {
        setDaysData(prev => {
            const newData = [...prev];
            newData[activeDayIndex] = updated;
            return newData;
        });
    };
    const [activeExerciseIndex, setActiveExerciseIndex] = useState<number | null>(null);
    const [activeSetForType, setActiveSetForType] = useState<number | null>(null);
    const [activeSetForRest, setActiveSetForRest] = useState<number | null>(null);
    const [activeSetForNote, setActiveSetForNote] = useState<number | null>(null);
    const [isGlobalRestTimeOpen, setIsGlobalRestTimeOpen] = useState(false);
    const [hasGlobalRestChanged, setHasGlobalRestChanged] = useState(false);
    const [globalRestTime, setGlobalRestTime] = useState({ h: '00', m: '00', s: '00' });

    const handleDayChange = (dayIdx: number) => {
        if (dayIdx === activeDayIndex) return;
        setActiveDayIndex(dayIdx);
        setActiveExerciseIndex(daysData[dayIdx].length > 0 ? 0 : null);
        setActiveSetForType(null);
        setActiveSetForRest(null);
        setActiveSetForNote(null);
        setIsGlobalRestTimeOpen(false);
    };

    const handleAddSet = () => {
        if (activeExerciseIndex === null) return;
        const updated = [...selectedExercises];
        updated[activeExerciseIndex].sets.push({ 
            id: Date.now().toString() + Math.random(), 
            kg: '', reps: '', type: 'normal',
            restTime: { h: '00', m: '00', s: '00' }
        });
        setSelectedExercises(updated);
    };

    const updateSet = (setIdx: number, field: keyof SelectedExercise['sets'][0], value: any) => {
        if (activeExerciseIndex === null) return;
        const updated = [...selectedExercises];
        updated[activeExerciseIndex].sets[setIdx] = {
            ...updated[activeExerciseIndex].sets[setIdx],
            [field]: value
        };
        setSelectedExercises(updated);
    };

    const handleRestChange = (unit: 'h'|'m'|'s', val: string) => {
        if (activeExerciseIndex === null || activeSetForRest === null) return;
        if (!/^\d{0,2}$/.test(val)) return;
        const updated = [...selectedExercises];
        updated[activeExerciseIndex].sets[activeSetForRest].restTime[unit] = val;
        setSelectedExercises(updated);
    };


    const handleDeleteExercise = () => {
        if (activeExerciseIndex === null) return;
        const updated = selectedExercises.filter((_, idx) => idx !== activeExerciseIndex);
        setSelectedExercises(updated);
        setActiveExerciseIndex(updated.length > 0 ? 0 : null);
    };

    const handleDeleteSet = (setIdx: number) => {
        if (activeExerciseIndex === null) return;
        const currentSets = selectedExercises[activeExerciseIndex].sets;
        if (currentSets.length <= 1) return; // Prevent deleting the last set
        
        const updated = [...selectedExercises];
        updated[activeExerciseIndex].sets = currentSets.filter((_, idx) => idx !== setIdx);
        setSelectedExercises(updated);
    };

    const handleCloseRestTimeModal = () => {
        if (activeExerciseIndex !== null && activeSetForRest !== null) {
            const updated = [...selectedExercises];
            const rt = updated[activeExerciseIndex].sets[activeSetForRest].restTime;
            rt.h = (rt.h || '0').padStart(2, '0');
            rt.m = (rt.m || '0').padStart(2, '0');
            rt.s = (rt.s || '0').padStart(2, '0');
            setSelectedExercises(updated);
        }
        setActiveSetForRest(null);
    };

    const handleOpenGlobalRest = () => {
        setIsGlobalRestTimeOpen(true);
        setHasGlobalRestChanged(false);
    };

    const handleGlobalRestChange = (unit: 'h'|'m'|'s', val: string) => {
        if (!/^\d{0,2}$/.test(val)) return;
        setGlobalRestTime(prev => ({ ...prev, [unit]: val }));
        setHasGlobalRestChanged(true);
    };


    const handleCloseGlobalRestTimeModal = () => {
        if (activeExerciseIndex !== null && hasGlobalRestChanged) {
            const h = (globalRestTime.h || '0').padStart(2, '0');
            const m = (globalRestTime.m || '0').padStart(2, '0');
            const s = (globalRestTime.s || '0').padStart(2, '0');
            
            const updated = [...selectedExercises];
            updated[activeExerciseIndex].sets.forEach(set => {
                set.restTime = { h, m, s };
            });
            setSelectedExercises(updated);
            setGlobalRestTime({ h, m, s });
        }
        setIsGlobalRestTimeOpen(false);
        setHasGlobalRestChanged(false);
    };

    return {
        state: {
            activeDayIndex,
            daysData,
            isSearchModalOpen,
            selectedExercises,
            activeExerciseIndex,
            activeSetForType,
            activeSetForRest,
            activeSetForNote,
            isGlobalRestTimeOpen,
            globalRestTime,
        },
        actions: {
            handleDayChange,
            setIsSearchModalOpen,
            setSelectedExercises,
            setActiveExerciseIndex,
            setActiveSetForType,
            setActiveSetForRest,
            setActiveSetForNote,
            handleAddSet,
            updateSet,
            handleRestChange,
            handleDeleteExercise,
            handleDeleteSet,
            handleCloseRestTimeModal,
            handleOpenGlobalRest,
            handleGlobalRestChange,
            handleCloseGlobalRestTimeModal
        }
    };
}
