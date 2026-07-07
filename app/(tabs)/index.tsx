import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CheckCircle2, CircleDashed, Loader2, Dumbbell } from 'lucide-react-native';
import { useRouter } from 'expo-router';

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
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setRutinas([]);
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ScrollView className='flex-1 p-4 bg-[#0F0F13]' contentContainerStyle={{ paddingTop: 30, paddingBottom: 100 }}>
            <View className="mb-8 flex-row justify-between items-center px-1">
                <Text className="text-2xl font-bold text-white tracking-tight">HabitLab</Text>
            </View>

            <View className='flex-1 mb-8'>
                <Text className='text-gray-400 text-xs font-bold mb-4 uppercase tracking-wider px-1'>
                    DATOS
                </Text>
                <View className="flex-row flex-wrap justify-between gap-y-3 px-1">
                    <View className="bg-[#1C1C22] rounded-2xl p-4 border border-gray-800/60 w-[48%]">
                        <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">SESIÓN ACTUAL</Text>
                        <Text className="text-white text-xl font-bold">0%</Text>
                    </View>
                    <View className="bg-[#1C1C22] rounded-2xl p-4 border border-gray-800/60 w-[48%]">
                        <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">CRONOMETRO</Text>
                        <Text className="text-white text-xl font-bold">00:00:00</Text>
                    </View>
                    <View className="bg-[#1C1C22] rounded-2xl p-4 border border-gray-800/60 w-[48%]">
                        <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">RACHA</Text>
                        <Text className="text-white text-xl font-bold">0 días</Text>
                    </View>
                    <View className="bg-[#1C1C22] rounded-2xl p-4 border border-gray-800/60 w-[48%]">
                        <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">VOLUMEN SEM.</Text>
                        <Text className="text-white text-xl font-bold">0 vol</Text>
                    </View>
                </View>
            </View>

            <View className='flex-1'>
                <Text className='text-gray-400 text-xs font-bold mb-4 uppercase tracking-wider px-1'>
                    RUTINAS
                </Text>
                {isLoading ? (
                    <View className="bg-[#15151A] rounded-2xl p-6 border border-gray-800/60 items-center justify-center py-16 gap-4 mx-1">
                        <Loader2 className="text-[#A890FE]" size={32} />
                        <Text className="text-gray-400 text-sm font-medium mt-2">Cargando información...</Text>
                    </View>
                ) : rutinas.length === 0 ? (
                    <View className="bg-[#15151A] rounded-2xl p-6 border border-gray-800/60 items-center justify-center py-16 gap-2 mx-1">
                        <Dumbbell className="mb-2" size={40} color="#9CA3AF" />
                        <Text className="text-lg font-bold text-white mt-2">Sin rutinas</Text>
                        <Text className="text-gray-400 text-[13px] max-w-[250px] text-center mt-2 leading-tight">Aún no has creado un plan de entrenamiento.</Text>
                        <TouchableOpacity onPress={() => router.push('/crear-plan')} className="mt-3">
                            <Text className="text-[#A890FE] text-sm font-bold">Crear Plan</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className="bg-[#1C1C22] rounded-3xl p-6 border-l-4 border-l-[#A890FE] border-t border-b border-r border-gray-800 mb-6">
                        <Text className="text-2xl font-bold mb-5 text-white">{rutinas[0].nombre}</Text>

                        <View className="flex-col gap-4 mb-8">
                            {rutinas[0].ejercicios.map((ejercicio) => (
                                <View key={ejercicio.id} className={`flex-row justify-between items-center bg-[#15151A] p-3 rounded-xl border ${ejercicio.completado ? 'border-gray-800' : 'border-[#A890FE]'}`}>
                                    <View className="flex-row gap-3 items-center">
                                        {ejercicio.completado ? (
                                            <CheckCircle2 size={20} color="#10B981" />
                                        ) : (
                                            <CircleDashed size={20} color="#A890FE" />
                                        )}
                                        <Text className={`text-sm font-medium ${ejercicio.completado ? 'text-gray-300' : 'text-[#A890FE] font-bold'}`}>
                                            {ejercicio.nombre}
                                        </Text>
                                    </View>
                                    <Text className={`text-sm font-bold ${ejercicio.completado ? 'text-white' : 'text-[#A890FE]'}`}>
                                        {ejercicio.peso}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity className="w-full bg-[#A890FE] py-4 rounded-xl items-center justify-center">
                            <Text className="text-black font-bold">Ver Rutina</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
