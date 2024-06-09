import { View, Text, StyleSheet, Image } from 'react-native';

export default function FriendTab() {
  return (
    <View style={styles.container}>
      <Text>Friends</Text>
      <Image source={require("../../assets/images/comingSoonImg.svg")} />
      <Text>Coming Soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
