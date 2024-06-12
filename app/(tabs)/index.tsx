import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, ImageStyle } from 'react-native';
import { useState, useCallback, useMemo } from "react";
import { Button, ButtonText, ButtonContext } from 'tamagui'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


export default function FarmTab() {
  require('@/assets/js/telegram-web-app')

  const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const userData =  useMemo(() => (
    {
      "username": "john_doe",
      "total_amount_of_coins": 100,
      // "start": "2024-01-01T00:00:00",
      // "finish": "2024-12-31T23:59:59",
      "start": new Date().getTime(),
      "finish": new Date().getTime() + 100000,
      "rate_per_hour": 2 * 60 * 60
    }
  ), [])

  const [date, setDate] = useState("")
  const [finishdate, setFinishDate] = useState(userData.finish);
  const [startFarmDate, setStartFarmDate] = useState(userData.start);
  const [money, setMoney] = useState(userData.total_amount_of_coins);

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('../../assets/fonts/Inter-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);


  function calculatePercentage(startDate: number, endDate: number) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (now < start) {
      return 0;
    }
    if (now > end) {
      return 100;
    }

    const totalDuration = end.getTime() - start.getTime();
    const elapsedDuration = now.getTime() - start.getTime();
    

    const percentage = +((elapsedDuration / totalDuration) * 100).toFixed(0) / 100;
    return percentage ;
  }
  const percentageData = calculatePercentage(userData.start, userData.finish);
  const [progress, setProgress] = useState(new Animated.Value(+percentageData));

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  const getUser = async () => {
    const tg_username = tg_user.username ? tg_user : "localuser"
    try {
      const response = await fetch(`https://etuqx2c3vf.execute-api.us-east-1.amazonaws.com/users/${tg_username}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response)
      if (!response.ok) {
        console.log("ne ok")
        const json = userData
        setMoney(json["total_amount_of_coins"])
        setStartFarmDate(new Date().getTime())
        setFinishDate(new Date().getTime() + 10000)
      }
      const json = response.json()
      console.log(json)

      // setMoney(json["total_amount_of_coins"])
      // setStartFarmDate(json.start * 1000)
      // setFinishDate(json.finish * 1000)

    } catch (error) {
      console.error(error);
    }
  };
  const handleClaimClick = () => {

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
    // new_data = response.json()

    // mock data
    const farming_value = ((new Date().getTime() - startFarmDate) / 1000) * userData.rate_per_hour / 60 / 60;
    const new_money_value = money + farming_value;
    setStartFarmDate(new Date().getTime())
    setFinishDate(new Date().getTime() + 100000)
    setMoney(new_money_value);
  }

  const secondsForFarm = () => {
    const currentSecondsTime = new Date().getTime();
    const secondsFarm = (finishdate - currentSecondsTime) / 1000;

    return Math.floor(secondsFarm);
  }

  const claimedTotalCurrent = () => {
    // calculate how tokens farm user right now
    return (((new Date().getTime() - startFarmDate) / 1000) * userData.rate_per_hour / 60 / 60).toFixed(3)
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

    setDate(`${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs} `)

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs} `;
  }

  startCountdown(secondsForFarm());

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Text style={styles.text}>
        <Image source={require("../../assets/images/icons/EcoinsIcon.svg")} />
        {money}
      </Text>
      <Image source={require("../../assets/images/icons/EcupLogo.svg")} />
      {/* <TouchableOpacity style={styles.button}  >
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, { width: progressBarWidth }]} />
          <Button >
              <Text style={styles.button_text}>{date} Claim
                <Image style={{
                  height: 12,
                  width: 12,
                }} source={require("../../assets/images/icons/EcoinsIcon.svg")} />
              </Text>
            </Button>
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={handleClaimClick} >
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, { width: progressBarWidth }]} />
          <Button onPress={handleClaimClick}>
              <Text style={styles.button_text}>{date} Claim {claimedTotalCurrent()}
                <Image style={{
                  height: 12,
                  width: 12,
                }} source={require("../../assets/images/icons/EcoinsIcon.svg")} />
              </Text>
            </Button>
        </View>
      </TouchableOpacity>

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
  progressContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#bb86fc',
    borderRadius: 5,
  },
});

declare global {
  interface Window {
      Telegram: any;
  }
}