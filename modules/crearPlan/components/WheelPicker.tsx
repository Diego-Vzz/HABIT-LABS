import React, { useEffect } from 'react';
import { View } from 'react-native';
import Reanimated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    useAnimatedRef,
    scrollTo,
    runOnUI,
    interpolate,
    interpolateColor,
    Extrapolation,
    type SharedValue,
} from 'react-native-reanimated';

const ITEM_HEIGHT = 50;

interface WheelItemProps {
    label: string;
    index: number;
    scrollY: SharedValue<number>;
}

function WheelItem({ label, index, scrollY }: WheelItemProps) {
    const animatedStyle = useAnimatedStyle(() => {
        const itemCenter = index * ITEM_HEIGHT;
        const distance = Math.abs(scrollY.value - itemCenter);
        const scale = interpolate(
            distance,
            [0, ITEM_HEIGHT, ITEM_HEIGHT * 2],
            [1.3, 0.9, 0.7],
            Extrapolation.CLAMP
        );
        const opacity = interpolate(
            distance,
            [0, ITEM_HEIGHT, ITEM_HEIGHT * 1.5],
            [1, 0.4, 0.15],
            Extrapolation.CLAMP
        );
        const color = interpolateColor(
            distance,
            [0, ITEM_HEIGHT],
            ['#A890FE', '#FFFFFF']
        );
        return {
            transform: [{ scale }],
            opacity,
            color,
            fontSize: 22,
            fontWeight: '900' as const,
        };
    });

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: ITEM_HEIGHT }}>
            <Reanimated.Text style={animatedStyle}>{label}</Reanimated.Text>
        </View>
    );
}

interface WheelPickerProps {
    value: string;
    onChange: (val: string) => void;
    max: number;
}

export function WheelPicker({ value, onChange, max }: WheelPickerProps) {
    const scrollY = useSharedValue(parseInt(value, 10) * ITEM_HEIGHT);
    const scrollRef = useAnimatedRef<Reanimated.ScrollView>();
    const options = Array.from({ length: max + 1 }, (_, i) => i.toString().padStart(2, '0'));

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const handleMomentumScrollEnd = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        const formatted = Math.max(0, Math.min(max, index)).toString().padStart(2, '0');
        if (formatted !== value) {
            onChange(formatted);
        }
    };

    useEffect(() => {
        const intVal = parseInt(value, 10);
        const targetY = intVal * ITEM_HEIGHT;
        scrollY.value = targetY;
        runOnUI(() => {
            'worklet';
            scrollTo(scrollRef, 0, targetY, true);
        })();
    }, [value]);

    return (
        <View style={{ height: 150, width: 64 }}>
            <Reanimated.ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onScroll={scrollHandler}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
            >
                {options.map((opt, i) => (
                    <WheelItem key={opt} label={opt} index={i} scrollY={scrollY} />
                ))}
            </Reanimated.ScrollView>
        </View>
    );
}
