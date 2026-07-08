import { useEffect } from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet, BackHandler } from 'react-native';
import { X } from 'lucide-react-native';
import { RestTime } from '../types';
import { WheelPicker } from './WheelPicker';
import Reanimated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    interpolateColor,
    Easing,
    Extrapolation,
} from 'react-native-reanimated';

interface RestTimeModalProps {
    isOpen: boolean;
    onClose: () => void;
    restTime: RestTime;
    onChange: (unit: 'h' | 'm' | 's', value: string) => void;
}

export function RestTimeModal({ isOpen, onClose, restTime, onChange }: RestTimeModalProps) {
    const animValue = useSharedValue(0);

    useEffect(() => {
        animValue.value = withTiming(isOpen ? 1 : 0, {
            duration: isOpen ? 120 : 80,
            easing: isOpen ? Easing.out(Easing.cubic) : Easing.in(Easing.quad),
        });
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const sub = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose();
            return true;
        });
        return () => sub.remove();
    }, [isOpen, onClose]);

    const backdropStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            animValue.value,
            [0, 1],
            ['rgba(15,15,19,0)', 'rgba(15,15,19,0.85)']
        ),
    }));

    const contentStyle = useAnimatedStyle(() => ({
        opacity: animValue.value,
        transform: [{
            translateY: interpolate(animValue.value, [0, 1], [12, 0], Extrapolation.CLAMP),
        }],
    }));

    return (
        <Reanimated.View
            style={[styles.overlay, backdropStyle]}
            pointerEvents={isOpen ? 'auto' : 'none'}
        >
            <Pressable onPress={onClose} style={StyleSheet.absoluteFill} />
            <Reanimated.View
                className="bg-[#1C1C22] border border-gray-800 rounded-3xl p-6 w-full max-w-[340px] flex-col gap-6 shadow-2xl"
                style={contentStyle}
            >
                <View className="flex-row justify-between items-center px-1">
                    <Text className="text-white font-bold text-lg">Tiempo de descanso</Text>
                    <TouchableOpacity
                        onPress={onClose}
                        className="bg-gray-800/50 p-2 rounded-full z-10"
                    >
                        <X size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>

                <View className="flex-col items-center justify-center bg-[#0F0F13] py-5 px-2 rounded-2xl border border-gray-800/60 relative overflow-hidden">
                    <View className="absolute top-[65%] left-0 right-0 h-[50px] bg-[#2D264B]/30 border-y border-[#A890FE]/20 mx-2 rounded-xl pointer-events-none" style={{ transform: [{ translateY: -25 }] }} />

                    <View className="flex-row justify-between w-full px-8 mb-1 z-10">
                        <Text className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Horas</Text>
                        <Text className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Min</Text>
                        <Text className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Seg</Text>
                    </View>

                    <View className="flex-row items-center justify-between w-full px-2 z-10 h-[150px]">
                        <WheelPicker value={restTime.h} onChange={(val) => onChange('h', val)} max={99} />
                        <Text className="text-gray-700 text-4xl font-normal">:</Text>
                        <WheelPicker value={restTime.m} onChange={(val) => onChange('m', val)} max={59} />
                        <Text className="text-gray-700 text-4xl font-normal">:</Text>
                        <WheelPicker value={restTime.s} onChange={(val) => onChange('s', val)} max={59} />
                    </View>
                </View>
            </Reanimated.View>
        </Reanimated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        zIndex: 1000,
    },
});
