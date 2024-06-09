import { View, Text, StyleSheet, Image } from 'react-native';
import { useState } from "react";
import { Button } from 'tamagui'

export default function FarmTab() {
      const FARMING_SECONDS = 10;

      const [money, setMoney] = useState(0);
      const [state, setState] = useState("not farming");
      const [lastActivity, setLastActivity] = useState(new Date());
      const [date, setDate] = useState("")

      const userData = {
          name: "Nickname",
          state: "farm",
          lastActivity: "2024-06-09T08:50:43.140787Z",
      }

      const handleClaimClick = () => {
          setMoney(money => money + DifferentSeconds());
          setState("not farming")
          setLastActivity(new Date())
      }

      const setFarmState = () => {
          setLastActivity(new Date())
         setState("farm")
      }

      const DifferentSeconds = () => {
           const lastActivityTime = new Date(lastActivity).getTime();
           const currentTime = new Date().getTime();
           const diffTime = (currentTime - lastActivityTime) / 1000

           return diffTime;
      }

      const SecondsForFarm = () => {
          const diffTime = Math.floor(DifferentSeconds());
          const farmingValue = FARMING_SECONDS - diffTime;

          return farmingValue;
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

        setDate(`${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`)

        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

    startCountdown(SecondsForFarm());

      const farmingIsEnd = (FARMING_SECONDS - DifferentSeconds()) <= 0;


      return (
          <View style={styles.container}>
            <Text style={styles.text}>
              <Image source={require("../../assets/images/icons/EcoinsIcon.svg")} />
                {money}
            </Text>
            <Image source={require("../../assets/images/icons/EcupLogo.svg")} />
              {state === "farm" ? (
                        <Button disabled={!farmingIsEnd? true : false} onPress={handleClaimClick} style={styles.button} backgroundColor="green" theme="active">{date} Claim {DifferentSeconds()} E-Coins</Button>
                  ) : (
                        <Button onPress={setFarmState} style={styles.button} backgroundColor="green" theme="active">Start farming</Button>

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
        opacity: 0.8
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
