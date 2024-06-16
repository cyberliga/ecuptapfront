import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button } from 'tamagui'
import Clipboard from '@react-native-clipboard/clipboard';
import { Referrals, Referral } from "@/app/api/schema"

import { getQuery } from "@/app/api/hooks/getQuery"

export default function FriendTab() {
  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied to Clipboard', 'The text has been copied to your clipboard.');
  };
  const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const tg_user_id = tg_user ? tg_user.id : 412037449;
  const [refs, setRefs] = useState(Array<Referral>)

  useEffect(() => {
    const response = getQuery<Referrals>(`/users/${tg_user_id}/referrals`);
    response.then((res) => {
      if (!res.ok) {
        setRefs([])
      } else {
        res.json().then((r) => {
          setRefs(r.referrals)
        })
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Friends
      </Text>
      <Text style={styles.subTitle}>
        Invite friends to earn more coins
      </Text>
      <View style={styles.usersWrapper}>
        {refs.map((item, index) => (
          <View style={styles.userContainer} key={index} >
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Image style={{ height: 32, width: 32, borderRadius: 96 }}
                source={require('@/assets/images/avatars/avatar1.svg')} />
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
      <Button style={styles.button} onPress={() => copyToClipboard('asdas')}>
        Invite a friends
      </Button>
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
    borderTopColor: '#EBEBEB',
    borderTopWidth: 1,
    paddingTop: 50,
    display: 'flex',
    gap: 26,
    height: '70%',
  },
  userContainer: {
    width: 350,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
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
