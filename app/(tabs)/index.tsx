import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useCallback, useEffect, useMemo } from "react";

import { Button } from 'tamagui'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { getQuery } from "@/app/api/hooks/getQuery"
import { claimedTotalCurrent, } from '@/app/api/utils'

import User from "@/app/api/schema"

import Timer from "@/components/Timer"



export default function FarmTab() {
  require('@/assets/js/telegram-web-app')

  const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const tg_user_id = tg_user ? tg_user.id : "localuser"

  const [finishdate, setFinishDate] = useState(0);
  const [startFarmDate, setStartFarmDate] = useState(0);
  const [money, setMoney] = useState(0);
  const [ratePerHour, setRatePerHour] = useState(0);
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('../../assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    const response = getQuery<User>({ path: `/users/${tg_user_id}` });
    response.then((res) => {
      setStartFarmDate(res.farm_start)
      setFinishDate(res.farm_finish)
      setRatePerHour(res.farm_coins_per_hour)
      setMoney(res.total_coins);
    })
  }, [tg_user_id])

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
