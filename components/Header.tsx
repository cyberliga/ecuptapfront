import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/images/avatars/avatar.svg")}></Image>
        <Text style={styles.text}>Nickname</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18
    },
    image: {
        width: 90,
        height: 90,

    },
    text: {
        color: 'white',
        fontSize: 27.937,
        fontFamily: 'DIN',
        fontWeight: '500',
        margin: 0,
    }
});
