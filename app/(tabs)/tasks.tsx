import { View, Text, StyleSheet, Image } from 'react-native';

export default function TaskTab() {
  return (
    <View style={styles.container}>
      <Text>Tasks</Text>
      <Image source={require("../../assets/images/comingSoonImg.svg")} />
      <Text>Coming Soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
