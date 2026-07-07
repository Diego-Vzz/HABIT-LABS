import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Dumbbell, Scale } from 'lucide-react-native';
import Reanimated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    interpolateColor,
    Extrapolation,
} from 'react-native-reanimated';

interface AnimatedTabItemProps {
    isFocused: boolean;
    onPress: () => void;
    Icon: React.ComponentType<{ size: number; color: string }>;
    label: string;
}

function AnimatedTabItem({ isFocused, onPress, Icon, label }: AnimatedTabItemProps) {
    const progress = useSharedValue(isFocused ? 1 : 0);

    useEffect(() => {
        progress.value = withSpring(isFocused ? 1 : 0, {
            damping: 18,
            stiffness: 280,
            mass: 0.8,
        });
    }, [isFocused]);

    const pillStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(progress.value, [0, 1], ['transparent', '#FFFFFF']),
        paddingHorizontal: interpolate(progress.value, [0, 1], [12, 20], Extrapolation.CLAMP),
        paddingVertical: 12,
        borderRadius: 999,
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        flex: 1,
        justifyContent: 'center' as const,
    }));

    const labelWrapStyle = useAnimatedStyle(() => ({
        opacity: interpolate(progress.value, [0.4, 1], [0, 1], Extrapolation.CLAMP),
        width: interpolate(progress.value, [0, 1], [0, 72], Extrapolation.CLAMP),
        marginLeft: interpolate(progress.value, [0, 1], [0, 8], Extrapolation.CLAMP),
        overflow: 'hidden' as const,
    }));

    return (
        <Pressable onPress={onPress} style={{ flex: 1 }} android_ripple={{ color: 'transparent' }}>
            <Reanimated.View style={pillStyle}>
                <Icon size={24} color={isFocused ? '#0F0F13' : '#9CA3AF'} />
                <Reanimated.View style={labelWrapStyle}>
                    <Text numberOfLines={1} style={{ color: '#0F0F13', fontWeight: 'bold', fontSize: 16 }}>
                        {label}
                    </Text>
                </Reanimated.View>
            </Reanimated.View>
        </Pressable>
    );
}

function CustomTabBar({ state, descriptors, navigation }: any) {
    return (
        <View className="absolute bottom-5 w-full flex-row justify-center items-center px-4 z-40" pointerEvents="box-none">
            <View
                className="bg-[#1C1C22] border border-gray-700 w-full max-w-[380px] rounded-full py-2 px-4 flex-row justify-between items-center gap-2"
                style={{ elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 }}
            >
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key];
                    const label = options.title !== undefined ? options.title : route.name;
                    const isFocused = state.index === index;
                    const Icon = route.name === 'index' ? Dumbbell : Scale;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <AnimatedTabItem
                            key={route.key}
                            isFocused={isFocused}
                            onPress={onPress}
                            Icon={Icon}
                            label={label}
                        />
                    );
                })}
            </View>
        </View>
    );
}

export default function TabLayout() {
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                sceneStyle: { backgroundColor: '#0F0F13' },
            }}>
            <Tabs.Screen
                name="pr-tool"
                options={{
                    title: 'PR Tool',
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Entreno',
                }}
            />
        </Tabs>
    );
}
