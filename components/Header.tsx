import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'tamagui'
import { useFonts } from 'expo-font';

export default function Header() {
    require('@/assets/js/telegram-web-app')
    const [fontsLoaded, fontError] = useFonts({
        'Inter-Black': require('@/assets/fonts/Inter-Bold.ttf'),
    });

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("@/assets/images/avatars/avatar1.webp")} />
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
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 20.34,
        margin: 0,
        fontFamily: 'Inter-Black',
    }
});