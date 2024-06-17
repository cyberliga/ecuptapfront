import 'expo-dev-client';
import '@tamagui/core/reset.css'
import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '../tamagui.config'
import { QueryProvider } from './api/hooks/QueryProvider';
// import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';



export default function App() {
  // useEffect(() => {
  //   // Hide the main button
  //   WebApp.MainButton.hide();
  //   // // Expand the Telegram Mini App to full screen
  //   WebApp.expand();
  // }, [])


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

