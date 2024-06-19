import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text } from 'tamagui'
import { Button } from 'tamagui'
import { Referrals } from "@/app/api/schema"
import { useQuery } from '../api/hooks/useQuery';
import Loader from '@/components/Loader';
import Clipboard from '@react-native-clipboard/clipboard';
import MainActionButton from '@/components/Buttons/MainButton'

export default function FriendTab() {
  const WebApp = window.Telegram.WebApp;
  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    WebApp?.showAlert('Ссылка скопирована');
  };
  console
  const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const tg_user_id = tg_user ? tg_user.id : 412037449;
  const { data, isLoading } = useQuery<Referrals>(`/users/${tg_user_id}/referrals`);

  return (
    <View style={styles.container}>
      {isLoading ? <Loader /> : (
        <>
          <Text style={styles.title}>
            Friends
          </Text>
          <Text style={styles.subTitle}>
            Invite friends to earn more coins
          </Text>
          <View style={styles.usersWrapper}>
            {data?.referrals?.map((item, index) => (
              <View style={styles.userContainer} key={index} >
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Image style={{ height: 32, width: 32, borderRadius: 96 }}
                    source={require('@/assets/images/avatars/avatar1.webp')} />
                  <Text style={styles.text}>
                    {item.username}
                  </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Image source={require('@/assets/images/icons/colorEcoinsIcon.svg')}
                    style={{ height: 15, width: 10 }} />
                  <Text style={styles.text}>
                    {item.reward}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <MainActionButton size={{ width: 350, height: 62 }} callback={() => copyToClipboard(`t.me/ecuplocal/start=${tg_user_id}`)}>
            Invite a friends
          </MainActionButton>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171C26',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    gap: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 27.12,
    fontFamily: 'Inter',
  },
  subTitle: {
    color: '#EBEBEB',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18.08,
    fontFamily: 'Inter',
  },
  usersWrapper: {
    paddingTop: 10,
    display: 'flex',
    height: '70%',
  },
  userContainer: {
    width: 350,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    borderBottomColor: '#2D3748',
    borderBottomWidth: 1,
    paddingVertical: 13,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18.08,
    fontFamily: 'Inter',
  },
  button: {
    backgroundColor: "#4EF2FF",
    borderRadius: 14,
    width: 350,
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  }
});
