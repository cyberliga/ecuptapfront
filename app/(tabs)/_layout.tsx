import { Tabs } from 'expo-router';
import { StyleSheet, Image, View } from "react-native";
import { useEffect, useState } from 'react';
import { getQuery } from "@/app/api/hooks/getQuery"
import  Carousel  from '@/components/Carousels/index';
import User from "@/app/api/schema"
import Loader from '@/components/Loader';
import Erorr from '@/components/Error'
import Header from '../../components/Header';

export default function TabLayout() {
  const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const tg_user_id = tg_user ? tg_user.id : 412037449;

  const [finishdate, setFinishDate] = useState(0);
  const [startFarmDate, setStartFarmDate] = useState(0);
  const [money, setMoney] = useState(0);
  const [ratePerHour, setRatePerHour] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCarousel, setShowCarousel] = useState(true);

  useEffect(() => {
    const response = getQuery<User>({ path: `/users/${tg_user_id}` });
    setLoading(true);
    response.then((res) => {
     if(res.message) {
      setLoading(false);
      setError(true);
     }else {
      setStartFarmDate(res.farm_start)
      setFinishDate(res.farm_finish)
      setRatePerHour(res.farm_coins_per_hour)
      setMoney(res.total_coins);
      setLoading(false);
     }
    })
  }, [tg_user_id])

  return (
    <> 
      {loading ? <Loader /> 
        : error ? <Erorr />
        : showCarousel ?(
          <Carousel setShowCarousel={setShowCarousel}/>
        )  : (
          <>
        
          <View style={styles.container}>
              <Header />
            </View>
            <Tabs screenOptions={{ tabBarActiveTintColor: '#979BFF' }}>
                <Tabs.Screen
                  name="index"
                  options={{
                    title: 'Farm',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Image style={{ tintColor: color }} source={require('../../assets/images/icons/homeIcon.svg')} />,
                  }} 
                  initialParams={{ setStartFarmDate: setStartFarmDate, setFinishDate: setFinishDate, 
                    setMoney: setMoney, startFarmDate: startFarmDate, ratePerHour: ratePerHour,
                    money: money, finishdate: finishdate}} />
                <Tabs.Screen
                  name="tasks"
                  options={{
                    title: 'Tasks',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Image style={{ tintColor: color }} source={require('../../assets/images/icons/tasksIcon.svg')} />,
                  }} />
                <Tabs.Screen
                  name="friends"
                  options={{
                    title: 'Friends',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Image style={{ tintColor: color }} source={require('../../assets/images/icons/friendsIcon.svg')} />,
                  }} />
              </Tabs>
            </>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  },
});
