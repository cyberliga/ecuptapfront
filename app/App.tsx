import 'expo-dev-client';
import '@tamagui/core/reset.css'
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '../tamagui.config'

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig} />
  )
}
