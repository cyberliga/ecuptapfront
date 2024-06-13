import { View, Text, StyleSheet, Image } from 'react-native';
// import { Carousels } from './Carousels/Carousesl';
export default function Header() {
    require('@/assets/js/telegram-web-app')
    return (
        <View style={styles.container}>
            {/* <Carousels /> */}
            <Image style={styles.image} source={require("../assets/images/avatars/avatar1.svg")} />
            <Text style={styles.text}>{window.Telegram?.WebApp?.initDataUnsafe?.user?.username}</Text>
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
        width: 76,
        height: 76,
        borderRadius: 96,
    },
    text: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 20.34,
        margin: 0,
        fontFamily: 'Inter',
    }
});