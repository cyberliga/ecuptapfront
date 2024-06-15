import { View, StyleSheet, Text } from 'react-native';

export const Erorr = () => {

    return (
        <View style={styles.container}>
            <Text>Oops, something went wrong. </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });