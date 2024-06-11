import { Tabs } from 'expo-router';
import { StyleSheet, Image, View } from "react-native";
import Header from '../../components/Header';

export default function TabLayout() {
  return (
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
            tabBarIcon: ({ color }) => <Image style={{ tintColor: color}} source={require('../../assets/images/icons/homeIcon.svg')}/>,
          }}
        />
         <Tabs.Screen
          name="tasks"
          options={{
            title: 'Tasks',
            headerShown: false,
            tabBarIcon: ({ color }) => <Image style={{ tintColor: color}}  source={require('../../assets/images/icons/tasksIcon.svg')}/>,
          }}
        />
        <Tabs.Screen
          name="friends"
          options={{
            title: 'Friends',
            headerShown: false,
            tabBarIcon: ({ color }) => <Image style={{ tintColor: color}}  source={require('../../assets/images/icons/friendsIcon.svg')}/>,
          }}
        />
      </Tabs>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  },
});
