import 'expo-dev-client';
import '@tamagui/core/reset.css'
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '../tamagui.config'
import { QueryProvider } from './api/hooks/QueryProvider';




export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <QueryProvider ></QueryProvider>
    </TamaguiProvider >
  )
}

declare global {
  interface Window {
    Telegram: any;
  }
}
