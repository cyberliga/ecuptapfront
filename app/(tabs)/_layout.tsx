import { Tabs } from 'expo-router';
import { StyleSheet, Image, View } from "react-native";
import React, { createContext, useContext, useState } from 'react';
import { useQuery } from '../api/hooks/useQuery';
import Carousel from '@/components/Carousels/index';
import User from "@/app/api/schema"
import Loader from '@/components/Loader';
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
  const [showCarousel, setShowCarouselt] = useState(!data?.is_onboarder);
  return (
    <>
      {isLoading ? (    
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ): isError ? <Erorr />
          : showCarousel ? (
            <Carousel setShowCarousel={setShowCarouselt}/>
          ) : (
            <>
             <PropsContext.Provider value={{ startFarmDate: data?.farm_start, ratePerHour: data?.farm_coins_per_hour,
                      money: data?.total_coins, finishdate: data?.farm_finish }}>
              <View style={styles.container}>
                  <Header />
                </View>
                <Tabs screenOptions={{ tabBarActiveTintColor: '#4EF2FF',tabBarStyle: {height: 70, paddingBottom: 10, backgroundColor: '#171C26'} }} >
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
