import { StyleSheet } from 'react-native';
import { Text, Button, View, Image, styled } from 'tamagui'
import { useCallback } from "react";
import { useFonts } from 'expo-font';
import { useMutation } from '../api/hooks/useMutation';
import { useProps } from './_layout';
import { Header } from '@/components/Header';
import { MainButtonContent, MainActionButton} from '@/components/Buttons';
import { ButtonLoader } from '@/components/Loaders';
import * as SplashScreen from 'expo-splash-screen';

const FarmTab = () => {
  require('@/assets/js/telegram-web-app')
  const WebApp = window.Telegram?.WebApp;
  const { startFarmDate, ratePerHour, money, finishdate} = useProps();
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
      <Header />
      <MoneyTextStyled>
        <Image source={require("@/assets/images/icons/colorEcoinsIcon.svg")} style={{ width: 17.5, height: 26.9, marginRight: 10, marginTop: 2 }} />
        {money && new Intl.NumberFormat("en").format(money)}
      </MoneyTextStyled>
      <Image source={require("@/assets/images/icons/EcupLogo.svg")} />
      <MainActionButton size={{ width: "$mainButtonSize", height: "$62" }} callback={handleClaimClick}>
        {loading ? <ButtonLoader /> : (
          <MainButtonContent finishDate={finishdate} startFarmDate={startFarmDate} ratePerHour={ratePerHour} />
        )}
      </MainActionButton>
    </View>
  );
}

const MoneyTextStyled = styled(Text, {
  display: 'flex',
  alignItems: "center",
  color: 'white',
  fontSize: 32,
  fontWeight: '600',
  margin: 0
})
const FarmButtomStyled = styled(Button, {
  backgroundColor: "$mainButton",
  borderRadius: 14,
  width: 350,
  color: '#000000',
  fontSize: 16,
  fontWeight: '600',
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171C26',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonTextSpan: {
    fontSize: 14,
    position: 'absolute',
    right: -95,
  }
});

export default FarmTab