import { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { X, Zap, BatteryCharging  } from 'lucide-react-native';
import { SetType } from '../types';
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

interface SetTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectType: (type: SetType) => void;
}

export function SetTypeModal({ isOpen, onClose, onSelectType }: SetTypeModalProps) {
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
            ['rgba(15,15,19,0)', 'rgba(15,15,19,0.85)']
        ),
    }));

    const contentStyle = useAnimatedStyle(() => ({
        opacity: animValue.value,
        transform: [{
            translateY: interpolate(animValue.value, [0, 1], [14, 0], Extrapolation.CLAMP),
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
                            className="bg-[#1C1C22] border border-gray-800 rounded-2xl p-4 w-full max-w-[300px] flex-col gap-2 shadow-2xl"
                            style={contentStyle}
                        >
                            <View className="flex-row justify-between items-center mb-4 px-1">
                                <Text className="text-white font-bold text-lg">Tipo de serie</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <X size={20} color="#9CA3AF" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() => { onSelectType('normal'); onClose(); }}
                                className="flex-row items-center gap-3 p-3 rounded-xl bg-[#1C1C22]"
                            >
                                <View className="w-8 h-8 rounded-lg bg-[#2D264B] items-center justify-center">
                                    <Text className="text-[#A890FE] font-bold text-xs">N</Text>
                                </View>
                                <Text className="text-gray-300 font-medium">Serie normal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { onSelectType('warmup'); onClose(); }}
                                className="flex-row items-center gap-3 p-3 rounded-xl bg-[#1C1C22]"
                            >
                                <View className="w-8 h-8 rounded-lg bg-orange-500/20 items-center justify-center">
                                    <BatteryCharging  size={16} color="#FB923C" />
                                </View>
                                <Text className="text-orange-400 font-medium">Serie de calentamiento</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { onSelectType('failure'); onClose(); }}
                                className="flex-row items-center gap-3 p-3 rounded-xl bg-[#1C1C22]"
                            >
                                <View className="w-8 h-8 rounded-lg bg-red-500/20 items-center justify-center">
                                    <Zap size={16} color="#F87171" />
                                </View>
                                <Text className="text-red-400 font-medium">Ir al fallo</Text>
                            </TouchableOpacity>
                        </Reanimated.View>
                    </TouchableWithoutFeedback>
                </Reanimated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
