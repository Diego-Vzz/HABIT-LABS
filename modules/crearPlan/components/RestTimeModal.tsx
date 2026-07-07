import { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { X } from 'lucide-react-native';
import { RestTime } from '../types';
import { WheelPicker } from './WheelPicker';
import Reanimated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
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
    const [localVisible, setLocalVisible] = useState(isOpen);
    const animValue = useSharedValue(isOpen ? 1 : 0);

    useEffect(() => {
        if (isOpen) {
            setLocalVisible(true);
            animValue.value = withTiming(1, { duration: 240, easing: Easing.out(Easing.cubic) });
        } else {
            animValue.value = withTiming(0, { duration: 190, easing: Easing.in(Easing.quad) }, (finished) => {
                if (finished) runOnJS(setLocalVisible)(false);
            });
        }
    }, [isOpen]);

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
            translateY: interpolate(animValue.value, [0, 1], [16, 0], Extrapolation.CLAMP),
        }],
    }));

    if (!localVisible) return null;

    return (
        <Modal
            visible={localVisible}
            animationType="none"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <Reanimated.View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }, backdropStyle]}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <Reanimated.View
                            className="bg-[#1C1C22] border border-gray-800 rounded-3xl p-6 w-full max-w-[340px] flex-col gap-6 shadow-2xl"
                            style={contentStyle}
                        >
                            <View className="flex-row justify-between items-center px-1">
                                <Text className="text-white font-bold text-lg">Tiempo de descanso</Text>
                                <TouchableOpacity
                                    onPress={onClose}
                                    className="bg-gray-800/50 p-2 rounded-full"
                                >
                                    <X size={16} color="#9CA3AF" />
                                </TouchableOpacity>
                            </View>

                            <View className="flex-col items-center justify-center bg-[#0F0F13] py-5 px-2 rounded-2xl border border-gray-800/60 relative overflow-hidden">
                                <View className="absolute top-[56.5%] left-0 right-0 h-[50px] bg-[#2D264B]/30 border-y border-[#A890FE]/20 mx-2 rounded-xl" style={{ transform: [{ translateY: -25 }] }} />

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
                    </TouchableWithoutFeedback>
                </Reanimated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
