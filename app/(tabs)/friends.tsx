import { View, Text, StyleSheet } from 'react-native';

export default function FriendTab() {
  return (
    <View style={styles.container}>
      <Text>Tab friend</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252433',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
