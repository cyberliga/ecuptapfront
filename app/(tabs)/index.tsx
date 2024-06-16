import { View, Text, StyleSheet, Image } from 'react-native';
import { useCallback, Dispatch, SetStateAction, useState, useEffect } from "react";
import { Button } from 'tamagui'
import { useFonts } from 'expo-font';
import { useMutation } from "@/app/api/hooks/getQuery"
import { claimedTotalCurrent } from '@/app/api/utils'
import { useRoute, RouteProp } from '@react-navigation/native';
import User from "@/app/api/schema"
import Timer from "@/components/Timer"
import * as SplashScreen from 'expo-splash-screen';

type FarmTabPropsList = {
  Farm: {
    setStartFarmDate: Dispatch<SetStateAction<number>>,
    setFinishDate: Dispatch<SetStateAction<number>>,
    setMoney: Dispatch<SetStateAction<number>>,
    startFarmDate: number,
    ratePerHour: number,
    money: number,
    finishdate: number,
  };
};

type FarmTabProps = RouteProp<FarmTabPropsList, 'Farm'>;

const FarmTab: React.FC = () => {
  require('@/assets/js/telegram-web-app')
  const [claimedTotal, setClaimedTotal] = useState(0)

  const route = useRoute<FarmTabProps>();
  const {
    setStartFarmDate, setFinishDate, setMoney, startFarmDate,
    ratePerHour, money, finishdate
  } = route.params;

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

  const { mutate } = useMutation<any>({ path: `/users/${tg_user_id}/claim-farmed-coins`, method: "GET" });

  const handleClaimClick = async () => {
    mutate({ args: {} }).then((res) => {
      if (!res.ok) {
        console.log("ne ok")
      } else {
        res.json().then((data) => {
          setStartFarmDate(data?.farm_start)
          setFinishDate(data?.farm_finish)
          setMoney(data?.total_coins);
        });
      }
    })
  }

  const claimedTotalCurrent = () => {
    // calculate how tokens farm user right now
    return Math.round((((new Date().getTime() / 1000 - startFarmDate)) * ratePerHour / 60 / 60))
  }

  const claimedTotalCurrentValue = claimedTotalCurrent();

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Text style={styles.text}>
        <Image source={require("../../assets/images/icons/colorEcoinsIcon.svg")} style={{ width: 17, height: 26, marginRight: 10 }} />
        {money}
      </Text>
      <Image source={require("../../assets/images/icons/EcupLogo.svg")} />
      <Button style={styles.button} onPress={handleClaimClick}>
        <Timer finishDate={finishdate} />
        <Text style={styles.button_text}><Image style={{ height: 15, width: 10 }}
          source={require("../../assets/images/icons/EcoinsIcon.svg")} />
          {claimedTotalCurrentValue}
          <span>Claim</span>
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
  button_text: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: "#141414",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Inter-Black",
    lineHeight: 28
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