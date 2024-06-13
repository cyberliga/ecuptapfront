import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useCallback, useEffect } from "react";
import { Button } from 'tamagui'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


interface userProps {
  "id": string,
  "total_amount_of_coins": number
  "farm_start": number
  "farm_finish": number
  "farm_coins_per_hour": number,
  "total_coins": number
}

export default function FarmTab() {
  require('@/assets/js/telegram-web-app')

  const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const tg_user_id = tg_user?.id ? tg_user : "localuser"

  const [date, setDate] = useState("")
  const [finishdate, setFinishDate] = useState(0);
  const [startFarmDate, setStartFarmDate] = useState(0);
  const [money, setMoney] = useState(0);
  const [ratePerHour, setRatePerHour] = useState(0);

  useEffect(() => {
    const getUserFunc = async () => {
      const response = await fetch(`https://9l5i5ge0o9.execute-api.us-east-1.amazonaws.com/users/${tg_user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
      )

      response.json().then((res: userProps) => {
        setStartFarmDate(res.farm_start)
        setFinishDate(res.farm_finish)
        setRatePerHour(res.farm_coins_per_hour)
        setMoney(res.total_coins);
      })
    }

    getUserFunc()
  }, [tg_user_id])


  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('../../assets/fonts/Inter-Bold.ttf'),
  });


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const handleClaimClick = async () => {
    const response = await fetch(`https://9l5i5ge0o9.execute-api.us-east-1.amazonaws.com/users/${tg_user_id}/claim-farmed-coins`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    response.json().then((res: userProps) => {
      setStartFarmDate(res.farm_start)
      setFinishDate(res.farm_finish)
      setMoney(res.total_coins);
    })
  }

  const secondsForFarm = () => {
    const currentSecondsTime = new Date().getTime() / 1000;
    const secondsFarm = (finishdate - currentSecondsTime);

    return Math.floor(secondsFarm);
  }

  const claimedTotalCurrent = () => {
    // calculate how tokens farm user right now
    return Math.round((((new Date().getTime() / 1000 - startFarmDate)) * ratePerHour / 60 / 60))
  }

  function startCountdown(seconds: number) {
    // start timer
    let remainingSeconds = seconds;

    const interval = setInterval(() => {
      if (remainingSeconds >= 0) {
        formatTime(remainingSeconds);
        remainingSeconds--;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Only update if the formatted time has changed
    // добавить use memo тоже?
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs} `;
    setDate(formattedTime);

    return formattedTime;
  }

  startCountdown(secondsForFarm());

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Text style={styles.text}>
        <Image source={require("../../assets/images/icons/EcoinsIcon.svg")} />
        {money}
      </Text>
      <Image source={require("../../assets/images/icons/EcupLogo.svg")} />
      <Button style={styles.button} onPress={handleClaimClick}>
        <Text style={styles.button_text}>{date} Claim {claimedTotalCurrent()}
          <Image style={{
            height: 12,
            width: 12,
          }} source={require("../../assets/images/icons/EcoinsIcon.svg")} />
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
    color: "#1C4532",
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Inter-Black",
    lineHeight: 27
  },
  text: {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-start',
    color: '#000000',
    fontSize: 32,
    fontWeight: '800',
    margin: 0,
  },
});

declare global {
  interface Window {
    Telegram: any;
  }
}
