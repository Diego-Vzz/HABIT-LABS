import React, { useRef } from 'react';
import { View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    type SharedValue,
} from 'react-native-reanimated';
import { Trash2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface SwipeToDeleteProps {
    children: React.ReactNode;
    onDelete: () => void;
    disabled?: boolean;
}

interface RightActionProps {
    progress: SharedValue<number>;
}

function RightAction({ progress }: RightActionProps) {
    const animStyle = useAnimatedStyle(() => ({
        transform: [{ scale: interpolate(progress.value, [0, 0.5, 1], [0, 0.7, 1], Extrapolation.CLAMP) }],
        opacity: interpolate(progress.value, [0, 0.35, 1], [0, 0.6, 1], Extrapolation.CLAMP),
    }));

    return (
        <View className="bg-[#EF4444] justify-center items-center w-20 rounded-xl overflow-hidden ml-2">
            <Reanimated.View style={animStyle}>
                <Trash2 size={24} color="white" />
            </Reanimated.View>
        </View>
    );
}

export function SwipeToDelete({ children, onDelete, disabled = false }: SwipeToDeleteProps) {
    const swipeableRef = useRef<SwipeableMethods>(null);

    if (disabled) {
        return <View className="w-full">{children}</View>;
    }

    const renderRightActions = (progress: SharedValue<number>) => (
        <RightAction progress={progress} />
    );

    return (
        <ReanimatedSwipeable
            ref={swipeableRef}
            renderRightActions={renderRightActions}
            rightThreshold={50}
            friction={2}
            onSwipeableOpen={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                onDelete();
                swipeableRef.current?.close();
            }}
            containerStyle={{ overflow: 'visible', borderRadius: 12 }}
        >
            <View className="bg-[#18181B] w-full rounded-xl">
                {children}
            </View>
        </ReanimatedSwipeable>
    );
}
