import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

import { ProductivityProvider } from '@/context/ProductivityContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ProductivityProvider>
        <View style={{ flex: 1, backgroundColor }}>
          <Stack
            screenOptions={{
              headerTintColor: '#0a7ea4',
              headerTitleStyle: { fontWeight: 'bold' },
              contentStyle: { backgroundColor },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="category/[id]" options={{ title: 'Topics' }} />
            <Stack.Screen name="topic/[catId]/[topicId]" options={{ title: 'Tip Details' }} />
          </Stack>
        </View>
        <StatusBar style="auto" />
      </ProductivityProvider>
    </ThemeProvider>
  );
}
