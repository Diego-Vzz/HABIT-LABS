import { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { X } from 'lucide-react-native';
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

interface NoteModalProps {
    isOpen: boolean;
    initialNote: string;
    onClose: (note: string) => void;
}

export function NoteModal({ isOpen, initialNote, onClose }: NoteModalProps) {
    const [note, setNote] = useState(initialNote);
    const [localVisible, setLocalVisible] = useState(isOpen);
    const animValue = useSharedValue(isOpen ? 1 : 0);

    useEffect(() => {
        if (isOpen) {
            setNote(initialNote || '');
        }
    }, [isOpen, initialNote]);

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

    const handleClose = () => {
        onClose(note);
    };

    if (!localVisible) return null;

    return (
        <Modal
            visible={localVisible}
            animationType="none"
            transparent={true}
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={handleClose}>
                <Reanimated.View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }, backdropStyle]}>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={{ width: '100%', maxWidth: 340 }}
                        >
                            <Reanimated.View
                                className="bg-[#1C1C22] border border-gray-800 rounded-3xl p-6 flex-col gap-4 shadow-2xl"
                                style={contentStyle}
                            >
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-white font-bold text-lg">Nota de la serie</Text>
                                    <TouchableOpacity
                                        onPress={handleClose}
                                        className="bg-gray-800/50 p-2 rounded-full"
                                    >
                                        <X size={20} color="#9CA3AF" />
                                    </TouchableOpacity>
                                </View>

                                <View className="flex-col gap-2">
                                    <TextInput
                                        value={note}
                                        onChangeText={(text) => setNote(text.slice(0, 1000))}
                                        placeholder="Escribe algo sobre esta serie..."
                                        placeholderTextColor="#4B5563"
                                        multiline
                                        textAlignVertical="top"
                                        className="w-full bg-[#0F0F13] text-white p-4 rounded-2xl border border-gray-800/60 h-40 text-sm leading-relaxed"
                                    />
                                    <View className="flex-row justify-end px-1">
                                        <Text className={`text-xs font-medium ${note.length >= 1000 ? 'text-red-400' : 'text-gray-500'}`}>
                                            {note.length}/1000
                                        </Text>
                                    </View>
                                </View>
                            </Reanimated.View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </Reanimated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
