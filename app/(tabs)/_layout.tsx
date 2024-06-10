import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Header from '../../components/Header';
// import homeIcon from '../../assets/images/icons/home.svg';
import { Cat } from '@tamagui/lucide-icons'
import { StyleSheet, Text, View } from "react-native";


export default function TabLayout() {
  return (
    <>
      <View style={styles.container}>
        <Header />
      </View>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Farm',
            headerShown: false,
            tabBarIcon: ({ color }) => <Cat color={color} />,
          }}
        />
        <Tabs.Screen
          name="friends"
          options={{
            title: 'Friends',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
        {/* <Tabs.Screen
                name="tasks"
                options={{
                    title: 'Tasks',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
              /> */}
      </Tabs>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  },
});
