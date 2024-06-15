import { View, Text, StyleSheet, Image } from 'react-native';
import { useCallback, Dispatch, SetStateAction } from "react";
import { Button } from 'tamagui'
import { useFonts } from 'expo-font';
import { getQuery } from "@/app/api/hooks/getQuery"
import { claimedTotalCurrent } from '@/app/api/utils'
import { useRoute, RouteProp } from '@react-navigation/native';
import User from "@/app/api/schema"
import Timer from "@/components/Timer"
import * as SplashScreen from 'expo-splash-screen';

type FarmTabPropsList = {
  Farm: {
    setStartFarmDate: Dispatch<SetStateAction<number>>, 
    setFinishDate: Dispatch<SetStateAction<number>> , 
    setMoney: Dispatch<SetStateAction<number>>, 
    startFarmDate: number , 
    ratePerHour: number, 
    money: number , 
    finishdate: number , 
  };
};
type FarmTabProps = RouteProp<FarmTabPropsList, 'Farm'>;

const FarmTab: React.FC = () =>  {
  require('@/assets/js/telegram-web-app')
  const route = useRoute<FarmTabProps>();
  const {
    setStartFarmDate, setFinishDate, setMoney, startFarmDate, 
    ratePerHour, money, finishdate
  } = route.params;

  const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const tg_user_id = tg_user ? tg_user.id : "localuser"

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('../../assets/fonts/Inter-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const handleClaimClick = async () => {
    const response = getQuery<User>({ path: `/users/${tg_user_id}/claim-farmed-coins` });
    response.then((res: User) => {
      setStartFarmDate(res.farm_start)
      setFinishDate(res.farm_finish)
      setMoney(res.total_coins);
    })
  }
  const claimedTotal = claimedTotalCurrent(startFarmDate, ratePerHour)

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Text style={styles.text}>
          <Image source={require("../../assets/images/icons/EcoinsIcon.svg")} style={{ marginRight: 10 }} />
          {money}
      </Text>
      <Image source={require("../../assets/images/icons/EcupLogo.svg")} />
      <Button style={styles.button} onPress={handleClaimClick}>
        <Timer finishDate={finishdate} />
        <Text style={styles.button_text}> Farming  <Image style={{ height: 15, width: 10, marginLeft: 5 }}
          source={require("../../assets/images/icons/EcoinsIcon.svg")} />
          {claimedTotal}
        </Text>
      </Button>
      {/* проблему описал внутри компонента FarmButton */}
      {/* <FarmButton /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 0,
    margin: 10,
    width: 350,
    height: 62,
    borderRadius: 10,
    borderWidth: 0,
    cursor: "pointer",
    opacity: 0.8,
    backgroundColor: "#BFFF97",
  },
  button_text: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: "#1C4532",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Inter-Black",
    lineHeight: 27
  },
  text: {
    alignItems: 'flex-start',
    color: '#000000',
    fontSize: 32,
    fontWeight: '800',
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