import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Plus, Trash2, Clock, Link2, BatteryCharging, Zap, ClipboardList, Timer, NotebookPen } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import {
    useCrearPlan,
    ExerciseSearchModal,
    SetTypeModal,
    RestTimeModal,
    SwipeToDelete,
    NoteModal
} from '..';
import { useEffect, useRef, useState } from 'react';
import Reanimated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

function AnimatedSetTypeButton({ type, setIdx, onPress }: { type: 'normal' | 'warmup' | 'failure', setIdx: number, onPress: () => void }) {
    const typeIndex = type === 'normal' ? 0 : type === 'warmup' ? 1 : 2;
    const animValue = useSharedValue(typeIndex);

    useEffect(() => {
        animValue.value = withTiming(typeIndex, { duration: 250 });
    }, [typeIndex]);

    const animStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                animValue.value,
                [0, 1, 2],
                ['#1C1C22', 'rgba(251, 146, 60, 0.2)', 'rgba(248, 113, 113, 0.2)']
            ),
            borderColor: interpolateColor(
                animValue.value,
                [0, 1, 2],
                ['#1f2937', 'transparent', 'transparent'] // border-gray-800 is approx #1f2937
            ),
            borderWidth: type === 'normal' ? 1 : 0
        };
    });

    return (
        <TouchableOpacity onPress={onPress}>
            <Reanimated.View className="w-10 h-10 rounded-lg items-center justify-center" style={animStyle}>
                {type === 'normal' && <Text className="font-bold text-[14px] text-gray-400">{setIdx + 1}</Text>}
                {type === 'warmup' && <BatteryCharging size={20} color="#FB923C" />}
                {type === 'failure' && <Zap size={20} color="#F87171" />}
            </Reanimated.View>
        </TouchableOpacity>
    );
}

export default function CrearPlan() {
    const { state, actions } = useCrearPlan();
    const router = useRouter();

    const scrollViewRef = useRef<ScrollView>(null);
    const [previousSetsLength, setPreviousSetsLength] = useState(0);
    const activeExercise = state.activeExerciseIndex !== null ? state.selectedExercises[state.activeExerciseIndex] : null;
    const currentSetsLength = activeExercise ? activeExercise.sets.length : 0;

    useEffect(() => {
        if (currentSetsLength > previousSetsLength && currentSetsLength > 1) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
        setPreviousSetsLength(currentSetsLength);
    }, [currentSetsLength]);

    const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    return (
        <SafeAreaView className="flex-1 bg-[#0F0F13]">
            <View className="flex-col flex-1 w-full pb-20 pt-2">
                {/* Cabecera */}
                <View className="flex-row items-center justify-between px-4 mb-6">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-1 -ml-1 rounded-xl"
                    >
                        <ChevronLeft size={30} color="#9CA3AF" />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Titulo"
                        placeholderTextColor="#9CA3AF"
                        className="bg-transparent text-xl font-bold text-center text-white p-0 m-0 w-32"
                        defaultValue="Titulo"
                    />
                    <TouchableOpacity className="bg-[#A890FE] py-2 px-5 rounded-2xl">
                        <Text className="text-black font-bold text-sm">Guardar</Text>
                    </TouchableOpacity>
                </View>

                {/* Selector de días */}
                <View className="flex-row justify-between items-center px-6 mb-6">
                    {dayLabels.map((label, idx) => {
                        const isSelected = state.activeDayIndex === idx;
                        const hasExercises = state.daysData[idx].length > 0;
                        return (
                            <View key={idx} className="flex-col items-center relative">
                                {hasExercises && !isSelected && (
                                    <View className="w-1 h-1 bg-[#A890FE] rounded-full absolute -top-1.5 right-1"></View>
                                )}
                                <TouchableOpacity
                                    onPress={() => actions.handleDayChange(idx)}
                                    className={`w-9 h-9 rounded-full items-center justify-center ${isSelected ? 'bg-[#A890FE]' : 'bg-transparent'}`}
                                >
                                    <Text className={`text-[13px] font-bold ${isSelected ? 'text-black' : 'text-gray-400'}`}>
                                        {label}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                {/* Selectores circulares (cuerpo) */}
                <View className="px-4 mb-5">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: 20 }}>
                        {state.selectedExercises.map((exercise, idx) => (
                            <TouchableOpacity
                                key={`${exercise.id}-${idx}`}
                                onPress={() => actions.setActiveExerciseIndex(idx)}
                                className={`w-12 h-12 rounded-full items-center justify-center border ${state.activeExerciseIndex === idx
                                    ? 'border-[#A890FE] bg-[#2D264B]/30'
                                    : 'border-gray-700 bg-transparent'
                                    }`}
                            >
                                <Text className={`text-[11px] font-bold tracking-wider ${state.activeExerciseIndex === idx ? 'text-[#A890FE]' : 'text-gray-500'}`}>
                                    IMG
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            onPress={() => actions.setIsSearchModalOpen(true)}
                            className="w-12 h-12 rounded-full border border-dashed border-gray-600 bg-transparent items-center justify-center"
                        >
                            <Plus size={26} color="#9CA3AF" />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View className='flex-1 px-4'>
                    <ScrollView className="flex-1" ref={scrollViewRef}>
                        {/* Áreas del cuerpo trabajadas (Placeholder) */}
                        <View className="bg-[#15151A] border border-gray-800/80 rounded-2xl h-44 items-center justify-center">
                            <Text className="text-gray-300 text-[15px]">Áreas del cuerpo trabajadas</Text>
                        </View>

                        {/* Ejercicio info */}
                        <View className="flex-col gap-4 mt-6">
                            <View className="flex-row items-start justify-between">
                                <View className="flex-col gap-0.5 flex-1">
                                    <View className="flex-row items-center gap-3">
                                        <View className="bg-[#2D264B] py-1 px-2 rounded-lg items-center justify-center">
                                            <Text className="text-[#A890FE] font-bold text-[11px] tracking-wide">
                                                {state.activeExerciseIndex !== null ? `0/${state.selectedExercises[state.activeExerciseIndex].sets.length}` : '0/0'}
                                            </Text>
                                        </View>
                                        <Text className="text-white font-bold text-[17px] leading-tight flex-1">
                                            {state.activeExerciseIndex !== null ? state.selectedExercises[state.activeExerciseIndex].name : 'Ejercicio no seleccionado'}
                                        </Text>
                                    </View>
                                </View>
                                {state.activeExerciseIndex !== null && (() => {
                                    const currentEx = state.selectedExercises[state.activeExerciseIndex];
                                    const allHaveRest = currentEx.sets.length > 0 && currentEx.sets.every(s => s.restTime.h !== '00' || s.restTime.m !== '00' || s.restTime.s !== '00');
                                    return (
                                        <View className="flex-row items-center gap-2">
                                            {currentEx.sets.length > 0 && (
                                                <TouchableOpacity
                                                    onPress={actions.handleOpenGlobalRest}
                                                    className={`p-2 rounded-lg ${allHaveRest ? 'bg-emerald-500/10' : ''}`}
                                                >
                                                    <ClipboardList size={24} color={allHaveRest ? "#10B981" : "#9CA3AF"} />
                                                </TouchableOpacity>
                                            )}
                                            <TouchableOpacity
                                                onPress={actions.handleDeleteExercise}
                                                className="p-2 rounded-lg bg-red-500/10"
                                            >
                                                <Trash2 size={24} color="#EF4444" />
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })()}
                            </View>
                            {state.activeExerciseIndex !== null && (
                                <View className="pb-8">
                                    {/* Headers tabla */}
                                    <View className="flex-row mt-4 items-center pl-10 pr-2">
                                        <Text className="w-[64px] text-[10px] font-bold text-gray-400 tracking-wider text-center">OPCIONES</Text>
                                        <View className="flex-1 items-center"><Text className="text-[10px] font-bold text-gray-400 tracking-wider">KG</Text></View>
                                        <View className="flex-1 items-center"><Text className="text-[10px] font-bold text-gray-400 tracking-wider">REPS</Text></View>
                                    </View>

                                    {/* Series list */}
                                    <View className="flex-col gap-3 mt-3">
                                        {state.selectedExercises[state.activeExerciseIndex].sets.map((set, setIdx) => {
                                            const isSwipeDisabled = state.selectedExercises[state.activeExerciseIndex!].sets.length <= 1;
                                            return (
                                                <SwipeToDelete
                                                    key={set.id}
                                                    disabled={isSwipeDisabled}
                                                    onDelete={() => actions.handleDeleteSet(setIdx)}
                                                >
                                                    <View className="flex-row items-center py-1 pr-2">
                                                        <View className="justify-center w-10 items-center">
                                                            <AnimatedSetTypeButton
                                                                type={set.type}
                                                                setIdx={setIdx}
                                                                onPress={() => actions.setActiveSetForType(setIdx)}
                                                            />
                                                        </View>
                                                        <View className="w-[80px] flex-row justify-between gap-4 items-center px-2">
                                                            <TouchableOpacity onPress={() => actions.setActiveSetForRest(setIdx)}>
                                                                <Timer size={24} color={set.restTime.h !== '00' || set.restTime.m !== '00' || set.restTime.s !== '00' ? "#10B981" : "#6B7280"} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => actions.setActiveSetForNote(setIdx)}>
                                                                <NotebookPen size={24} color={set.note && set.note.trim() !== '' ? "#10B981" : "#6B7280"} />
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View className="flex-1 items-center">
                                                            <TextInput
                                                                keyboardType="decimal-pad"
                                                                placeholder="-"
                                                                placeholderTextColor="#4B5563"
                                                                className="w-12 bg-transparent text-center text-gray-300 font-bold"
                                                                value={set.kg}
                                                                onChangeText={(val) => {
                                                                    if (/^\d*\.?\d{0,2}$/.test(val)) {
                                                                        actions.updateSet(setIdx, 'kg', val);
                                                                    }
                                                                }}
                                                            />
                                                        </View>
                                                        <View className="flex-1 items-center">
                                                            <TextInput
                                                                keyboardType="numeric"
                                                                placeholder="-"
                                                                placeholderTextColor="#4B5563"
                                                                className="w-12 bg-transparent text-center text-gray-300 font-bold"
                                                                value={set.reps}
                                                                onChangeText={(val) => {
                                                                    if (/^\d*$/.test(val)) {
                                                                        actions.updateSet(setIdx, 'reps', val);
                                                                    }
                                                                }}
                                                            />
                                                        </View>
                                                    </View>
                                                </SwipeToDelete>
                                            );
                                        })}
                                    </View>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                    {/* Añadir serie */}
                    {state.activeExerciseIndex !== null && (<TouchableOpacity
                        onPress={actions.handleAddSet}
                        className="w-full bg-[#1C1C22] border border-gray-800 py-3.5 rounded-xl flex-row items-center justify-center gap-2"
                    >
                        <Plus size={22} color="#D1D5DB" />
                        <Text className="text-gray-300 text-[16px] font-medium">Añadir serie</Text>
                    </TouchableOpacity>)}

                </View>

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

                <NoteModal
                    isOpen={state.activeSetForNote !== null && state.activeExerciseIndex !== null}
                    initialNote={state.activeSetForNote !== null && state.activeExerciseIndex !== null ? (state.selectedExercises[state.activeExerciseIndex].sets[state.activeSetForNote].note || '') : ''}
                    onClose={(note) => {
                        if (state.activeSetForNote !== null) {
                            actions.updateSet(state.activeSetForNote, 'note', note);
                            actions.setActiveSetForNote(null);
                        }
                    }}
                />
            </View>

            <RestTimeModal
                isOpen={state.activeSetForRest !== null && state.activeExerciseIndex !== null}
                onClose={actions.handleCloseRestTimeModal}
                restTime={state.activeSetForRest !== null && state.activeExerciseIndex !== null ? state.selectedExercises[state.activeExerciseIndex].sets[state.activeSetForRest].restTime : { h: '00', m: '00', s: '00' }}
                onChange={actions.handleRestChange}
            />

            <RestTimeModal
                isOpen={state.isGlobalRestTimeOpen}
                onClose={actions.handleCloseGlobalRestTimeModal}
                restTime={state.globalRestTime}
                onChange={actions.handleGlobalRestChange}
            />
        </SafeAreaView>
    );
}
