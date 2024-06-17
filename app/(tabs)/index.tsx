import { View, Text, StyleSheet, Image } from 'react-native';
import { useCallback } from "react";
import { Button } from 'tamagui'
import { useFonts } from 'expo-font';
import { useMutation } from '../api/hooks/useMutation';
import MainButtonContent from "@/components/MainButtonContent"
import * as SplashScreen from 'expo-splash-screen';
import { useProps } from './_layout';
import ButtonLoader from '@/components/Loader/ButtonLoader';

const FarmTab: React.FC = () => {
  require('@/assets/js/telegram-web-app')
  const { startFarmDate, ratePerHour, money, finishdate
  } = useProps();
  const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const tg_user_id = tg_user ? tg_user.id : 412037449;

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('../../assets/fonts/Inter-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const { mutate, loading } = useMutation<any>({
    path: `/users/${tg_user_id}/claim-farmed-coins`, method: "GET", queryKeyRefetch: [
      `/users/${tg_user_id}`,
    ],
  });

  const handleClaimClick = () => {
    mutate({ args: {} }).then((res) => {
      if (!res.ok) {
        console.log("ne ok")
      } else {
        res.json().then((data) => {
          console.log(data)
        });
      }
    })
  }

  return finishdate && startFarmDate && ratePerHour && (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Text style={styles.text}>
        <Image source={require("../../assets/images/icons/colorEcoinsIcon.svg")} style={{ width: 17, height: 26, marginRight: 10 }} />
        {money}
      </Text>
      <Image source={require("../../assets/images/icons/EcupLogo.svg")} />
      <Button style={styles.button} onPress={handleClaimClick}>
        {loading ? <ButtonLoader /> : (
          <MainButtonContent finishDate={finishdate} startFarmDate={startFarmDate} ratePerHour={ratePerHour} />
        )}

      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171C26',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#4EF2FF",
    borderRadius: 14,
    width: 350,
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },

  text: {
    alignItems: 'flex-start',
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    margin: 0,
  },
  buttonTextSpan: {
    fontSize: 14,
    position: 'absolute',
    right: -95,
  }
});

declare global {
  interface Window {
    Telegram: any;
  }
}

export default FarmTab