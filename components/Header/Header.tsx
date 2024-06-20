import { Text, View, Image, styled } from 'tamagui'
import { useFonts } from 'expo-font';

export const Header = () => {
    require('@/assets/js/telegram-web-app')
    const [fontsLoaded, fontError] = useFonts({
        'Inter-Black': require('@/assets/fonts/Inter-Bold.ttf'),
    });

    return (
        <HeaderStyle>
            <Image source={require("@/assets/images/avatars/1.webp")} style={{borderRadius: 96}} />
            <HeaderTextStyle>{window.Telegram?.WebApp?.initDataUnsafe?.user?.username}</HeaderTextStyle>
        </HeaderStyle>
    );
}

const HeaderTextStyle = styled(Text, {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 20.34,
    margin: 0,
})
const HeaderStyle = styled(View, {
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18
})
