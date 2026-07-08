import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css"

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }} className="bg-[#0F0F13]">
      <Stack screenOptions={{ contentStyle: { backgroundColor: '#0F0F13' } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="crear-plan" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
      </Stack>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
