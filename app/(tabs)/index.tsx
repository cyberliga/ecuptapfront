import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'tamagui'
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
  const WebApp = window.Telegram?.WebApp;
  const { startFarmDate, ratePerHour, money, finishdate
  } = useProps();
  const tgUser = WebApp?.initDataUnsafe?.user;
  const tgUserId = tgUser ? tgUser.id : 412037449;

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('../../assets/fonts/Inter-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const { mutate, loading } = useMutation<any>({
    path: `/users/${tgUserId}/claim-farmed-coins`, method: "POST", queryKeyRefetch: [
      `/users/${tgUserId}`,
    ],
  });

  const handleClaimClick = () => {
    WebApp?.showAlert('Нафармлено')
    mutate({ args: {} })
  }

  return finishdate && startFarmDate && ratePerHour && (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Text style={styles.text}>
        <Image source={require("../../assets/images/icons/colorEcoinsIcon.svg")} style={{ width: 17.5, height: 26.9, marginRight: 10, marginTop: 2 }} />
        {money && new Intl.NumberFormat("en").format(money)}
      </Text>
      <Image source={require("@/assets/images/icons/EcupLogo.svg")} />
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
    display: 'flex',
    alignItems: "center",
    color: '$white',
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

export default FarmTab