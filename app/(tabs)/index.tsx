import { View, Text, StyleSheet, Image , Animated, TouchableOpacity} from 'react-native';
import { useState, useCallback, useEffect, useRef } from "react";
import { Button, ButtonText, ButtonContext } from 'tamagui'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function FarmTab() {
  const [date, setDate] = useState("")
  const [Finishdate, setFinishDate] = useState("")
  const [startFarmDate, setStartFarmDate] = useState("")

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('../../assets/fonts/Inter-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const userData = {
    "username": "john_doe",
    "total_amount_of_coins": 100,
    "start": "2024-06-11T06:02:36.772189+00:00",
    "finish": "2024-06-12T18:22:50.140787Z",
    "rate_per_hour": 2 * 60 * 60
  }

  const [money, setMoney] = useState(userData.total_amount_of_coins);

  function calculatePercentage(startDate: string, endDate: string) {
    const start: number = new Date(startDate).getTime();
    const end: number = new Date(endDate).getTime();
    const now : number = new Date().getTime();

    if (now < start) {
        return 0;
    }
    if (now > end) {
        return 100;
    }
    return ( now - start / (end - start)) * 100;
}
const percentageData = calculatePercentage(userData.start , userData.finish);
const [progress, setProgress] = useState(new Animated.Value(percentageData));

const progressBarWidth = progress.interpolate({
  inputRange: [0, 1],
  outputRange: ['10%', '100%']
});

  // const getUser = async () => {
  //   try {
  //     const response = await fetch('https://g6r44q47m1.execute-api.us-east-1.amazonaws.com/get-user-info/john_doe', {
  //       mode: 'no-cors',
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       }
  //     });

  //     console.log(response)
  //     if (!response.ok) {
  //       const showPopup = useShowPopup();
  //       showPopup({ message: 'Hello, I am popup' })
  //     }
  //     const json = await response.json();

  //     setMoney(json["total_amount_of_coins"])
  //     setStartFarmDate(json["start"])
  //     setFinishDate(json["finish"])
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const getUser = () => {
    const [allowances, setAllowances] = useState([]);

    useEffect(() => {
      fetch('https://g6r44q47m1.execute-api.us-east-1.amazonaws.com/get-user-info/john_doe', { mode: "no-cors" })
        .then(data => {
          console.log(data)
          return data.json();
        })
        .then(data => {
          setAllowances(data);
        })
        .catch(err => {
          console.log(123123);
        });
    }, []);
  }

  const user = getUser()
  console.log(user)

  const setStartFarm = () => {
    const response = async () => {
      try {
        const response = await fetch('https://g6r44q47m1.execute-api.us-east-1.amazonaws.com/claim/start/john_doe', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }
        });
        if (!response.ok) {
          // показать уведомление
        }
        const json = await response.json();
        console.log(json)

        // setStartFarmDate(new Date())
      } catch (error) {
        console.error(error);
      }
    };
    setStartFarmDate(new Date().toISOString())
  }
  getUser()

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


  const secondsForFarm = () => {
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

  startCountdown(secondsForFarm());

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
        // <Button disabled={!farmingIsEnd ? true : false} onPress={handleClaimClick} style={styles.button} >{date} Claim {claimedTotalCurrent()} E-Coins</Button>
        <TouchableOpacity style={styles.button} disabled={!farmingIsEnd ? true : false}  onPress={handleClaimClick} >
          <View style={styles.progressContainer}>
              <Animated.View style={[styles.progressBar, { width: progressBarWidth }]} />
              <Text style={styles.button_text}>{date} Claim {claimedTotalCurrent()} E-Coins</Text>
          </View>
        </TouchableOpacity>
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
