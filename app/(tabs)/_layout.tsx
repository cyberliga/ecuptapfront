import { Tabs } from 'expo-router';
import { StyleSheet, Image, View } from "react-native";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '../api/hooks/useQuery';
import Carousel from '@/components/Carousels/index';
import User from "@/app/api/schema"
import LoaderImg from '@/components/Loader/LoaderImg';
import Erorr from '@/components/Error'
import Header from '../../components/Header';

type PropsContextType = {
  startFarmDate?: number,
  ratePerHour?: number,
  money?: number,
  finishdate?: number,
};

const PropsContext = createContext<PropsContextType | undefined>(undefined);

export const useProps = () => {
  const context = useContext(PropsContext);
  if (!context) {
    throw new Error('useProps must be used within a PropsProvider');
  }
  return context;
};

export default function TabLayout() {
  const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const tg_user_id = tg_user ? tg_user.id : 412037449;
  const { data, isLoading, error: isError } = useQuery<User>(`/users/${tg_user_id}`);
  const [showLoader, setShowLoader] = useState(false);
  const [showCarousel, setShowCarousel] = useState<boolean>(!!data?.is_onboarded); // TODO почему то !data?.is_onboarder возвращает тру, а должно фолс


  useEffect(() => {
    if (isLoading) {
      const toRef = setTimeout(() => {
        setShowLoader(true);
        clearTimeout(toRef);
        // it is good practice to clear the timeout (but I am not sure why)
      }, 0);
    }
  }, [isLoading]);

  useEffect(() => {
    if (showLoader) {
      const toRef = setTimeout(() => {
        setShowLoader(false);
        clearTimeout(toRef);
      }, 4000);
    }
  }, [showLoader]);

  return (
    <>
      {showLoader ? (
        <View style={styles.loaderContainer}>
          <LoaderImg />
        </View>
      ) : isError ? <Erorr />
        : showCarousel ? (
          <Carousel setShowCarousel={setShowCarousel} />
        ) : (
          <>
            <PropsContext.Provider value={{
              startFarmDate: data?.farm_start, ratePerHour: data?.farm_coins_per_hour,
              money: data?.total_coins, finishdate: data?.farm_finish
            }}>
              <View style={styles.container}>
                <Header />
              </View>
              <Tabs screenOptions={{ tabBarActiveTintColor: '#4EF2FF', tabBarStyle: { height: 70, paddingBottom: 22, paddingTop: 14, backgroundColor: '#171C26' } }} >
                <Tabs.Screen
                  name="index"
                  options={{
                    title: 'Farm',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Image style={{ tintColor: color }} source={require('../../assets/images/icons/homeIcon.svg')} />,
                  }}
                />
                <Tabs.Screen
                  name="tasks"
                  options={{
                    title: 'Поле наград',
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

            </PropsContext.Provider>
          </>
        )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171C26',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#171C26',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
