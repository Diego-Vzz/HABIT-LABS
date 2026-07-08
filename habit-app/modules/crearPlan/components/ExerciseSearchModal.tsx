import { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { X, Search, Filter, Plus } from 'lucide-react-native';
import { Exercise } from '../types';
import { mockExercises } from '../utils/constants';
import Reanimated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    runOnJS,
    interpolate,
    interpolateColor,
    Easing,
    Extrapolation,
} from 'react-native-reanimated';

interface ExerciseSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectExercise: (exercise: Exercise) => void;
}

export function ExerciseSearchModal({ isOpen, onClose, onSelectExercise }: ExerciseSearchModalProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [localVisible, setLocalVisible] = useState(isOpen);
    const animValue = useSharedValue(isOpen ? 1 : 0);

    useEffect(() => {
        if (isOpen) {
            setLocalVisible(true);
            animValue.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.cubic) });
        } else {
            animValue.value = withTiming(0, { duration: 120, easing: Easing.in(Easing.quad) }, (finished) => {
                if (finished) runOnJS(setLocalVisible)(false);
            });
        }
    }, [isOpen]);

    const backdropStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            animValue.value,
            [0, 1],
            ['rgba(15,15,19,0)', 'rgba(15,15,19,0.6)']
        ),
    }));

    const sheetStyle = useAnimatedStyle(() => ({
        transform: [{
            translateY: interpolate(animValue.value, [0, 1], [80, 0], Extrapolation.CLAMP),
        }],
        opacity: interpolate(animValue.value, [0, 0.4, 1], [0, 0.8, 1], Extrapolation.CLAMP),
    }));

    if (!localVisible) return null;

    return (
        <Modal
            visible={localVisible}
            animationType="none"
            transparent={false}
            onRequestClose={onClose}
        >
            <Reanimated.View style={[{ flex: 1, backgroundColor: '#0F0F13' }, sheetStyle]}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, padding: 16 }}>
                        <View className="flex-row items-center justify-between mb-6">
                            <Text className="text-xl font-bold text-white">Añadir Ejercicio</Text>
                            <TouchableOpacity
                                onPress={onClose}
                                className="p-2 bg-[#1C1C22] rounded-full"
                            >
                                <X size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                        </View>

                        <View className="relative mb-4 justify-center">
                            <View className="absolute left-3 z-10">
                                <Search size={20} color="#9CA3AF" />
                            </View>
                            <TextInput
                                placeholder="Buscar ejercicio..."
                                placeholderTextColor="#6B7280"
                                value={searchTerm}
                                onChangeText={setSearchTerm}
                                className="w-full bg-[#1C1C22] text-white pl-10 pr-4 py-3 rounded-xl"
                            />
                        </View>

                        <View className="flex-row mb-6">
                            <TouchableOpacity className="flex-row items-center gap-2 bg-[#1C1C22] px-4 py-2 rounded-xl">
                                <Filter size={16} color="#D1D5DB" />
                                <Text className="text-gray-300 text-sm font-medium">Músculo</Text>
                            </TouchableOpacity>
                        </View>

                        <Reanimated.ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <View className="flex-col gap-3 pb-4">
                                {mockExercises
                                    .filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map(exercise => (
                                        <TouchableOpacity
                                            key={exercise.id}
                                            onPress={() => {
                                                onSelectExercise(exercise);
                                                setSearchTerm('');
                                            }}
                                            className="flex-row items-center gap-4 bg-[#1C1C22] p-4 rounded-xl w-full"
                                        >
                                            <View className="w-12 h-12 rounded-full bg-[#2D264B]/40 border border-[#A890FE]/20 items-center justify-center">
                                                <Text className="text-[#A890FE]/40 text-[10px] font-bold tracking-wider">IMG</Text>
                                            </View>

                                            <View className="flex-1">
                                                <Text className="text-white font-bold text-sm">{exercise.name}</Text>
                                                <Text className="text-gray-400 text-xs mt-1.5 leading-snug">
                                                    {exercise.description}
                                                </Text>
                                            </View>

                                            <View className="pl-2">
                                                <Plus size={20} color="#A890FE" />
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                                {mockExercises.filter(ex => ex.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                                    <Text className="text-center text-gray-500 mt-10 text-sm">
                                        No se encontraron ejercicios.
                                    </Text>
                                )}
                            </View>
                        </Reanimated.ScrollView>
                    </View>
                </SafeAreaView>
            </Reanimated.View>
        </Modal>
    );
}
