import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { TamaguiProvider } from 'tamagui';

import tamaguiConfig from '../tamagui.config';
import { QueryProvider } from './api/hooks/QueryProvider';

export default function Layout() {
  const colorScheme = useColorScheme()

  require('@/assets/js/telegram-web-app')

  const WebApp = window.Telegram?.WebApp;

  WebApp?.expand();

  return (
    <QueryProvider >
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
        <ThemeProvider value={DarkTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </TamaguiProvider>
    </QueryProvider>
  );
}