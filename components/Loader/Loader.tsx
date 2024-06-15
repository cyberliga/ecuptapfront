import { UIActivityIndicator   } from 'react-native-indicators';
import { View, StyleSheet } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
        <UIActivityIndicator   color="rgba(28, 69, 50, 1.00)" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Loader;