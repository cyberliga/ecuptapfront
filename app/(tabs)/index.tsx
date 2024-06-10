import { View, Text, StyleSheet, Image } from 'react-native';
import { useState, useCallback } from "react";
import { Button, ButtonText, ButtonContext } from 'tamagui'
import { useShowPopup } from '@vkruglikov/react-telegram-web-app';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


export default function FarmTab() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('../../assets/fonts/Inter-Bold.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const [date, setDate] = useState("")
  const [Finishdate, setFinishDate] = useState("")
  const [startFarmDate, setStartFarmDate] = useState("")

  const userData = {
    "username": "john_doe",
    "total_amount_of_coins": 150,
    "start": "2024-06-10T06:02:36.772189+00:00",
    "finish": "2024-06-10T15:22:50.140787Z",
    "rate_per_hour": 2 * 60 * 60
  }

  const [money, setMoney] = useState(userData.total_amount_of_coins);

  const getUser = async () => {
    try {
      const response = await fetch('https://g6r44q47m1.execute-api.us-east-1.amazonaws.com/get-user-info/john_doe');
      if (!response.ok) {
        const showPopup = useShowPopup();
        showPopup({ message: 'Hello, I am popup' })
      }
      const json = await response.json();

      setMoney(json["total_amount_of_coins"])
      setStartFarmDate(json["start"])
      setFinishDate(json["finish"])
    } catch (error) {
      console.error(error);
    }
  };

  const setStartFarm = () => {
    // const response = async () => {
    //   try {
    //     const response = await fetch('https://g6r44q47m1.execute-api.us-east-1.amazonaws.com/claim/start/john_doe', {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     });
    //     if (!response.ok) {
    //       // показать уведомление
    //     }
    //     const json = await response.json();
    //     setStartFarmDate(new Date())
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    setStartFarmDate(new Date().toISOString())
  }

  const handleClaimClick = () => {
    setStartFarmDate("")
    setMoney(userData.total_amount_of_coins);
    // const response = async () => {
    //   try {
    //     const response = await fetch('https://g6r44q47m1.execute-api.us-east-1.amazonaws.com/claime/finish/john_doe', {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     });
    //     if (!response.ok) {
    //       // показать уведомление
    //     }
    //     const json = await response.json();
    //     setStartFarmDate(json["start"])
    //     setMoney(json["total_amount_of_coins"]);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  }


  const SecondsForFarm = () => {
    const currentSecondsTime = new Date().getTime();
    const secondsFarm = (new Date(userData.finish).getTime() - currentSecondsTime) / 1000;

    return Math.floor(secondsFarm);
  }

  const claimedTotalCurrent = () => {
    return ((new Date().getTime() - new Date(startFarmDate).getTime()) / 1000) * userData.rate_per_hour / 60 / 60
  }


  function startCountdown(seconds: number) {
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

    setDate(`${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs} `)

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs} `;
  }

  startCountdown(SecondsForFarm());

  const farmingIsEnd = new Date(userData.finish).getTime() <= new Date().getTime();

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Text style={styles.text}>
        <Image source={require("../../assets/images/icons/EcoinsIcon.svg")} />
        {money}
      </Text>
      <Image source={require("../../assets/images/icons/EcupLogo.svg")} />
      {startFarmDate === "" ? (
        <Button onPress={setStartFarm} style={styles.button}>{<ButtonText style={styles.button_text}>Start farming</ButtonText>}</Button>
      ) : (
        <Button disabled={!farmingIsEnd ? true : false} onPress={handleClaimClick} style={styles.button} >{date} Claim {claimedTotalCurrent()} E-Coins</Button>
      )}
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
    borderWidth: 2,
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
