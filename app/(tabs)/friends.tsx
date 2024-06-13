import { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button } from 'tamagui'
import Clipboard from '@react-native-clipboard/clipboard';

export default function FriendTab() {
  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copied to Clipboard', 'The text has been copied to your clipboard.');
  };

  const data = [
    {
      icon: require('@/assets/images/avatars/avatar1.svg'),
      userName: 'llallalaaa',
      coins: '3000'
    }
  ]
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Friends
      </Text>
      <Text style={styles.subTitle}>
        Invite friends to earn more coins
      </Text>
      <View style={styles.usersWrapper}>
        {data.map((item, index)=> (
          <View style={styles.userConteiner} key={index} >
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Image style={{height: 32,width: 32, borderRadius: 96}} 
                source={item.icon} />
              <Text style={styles.text}>
                  {item.userName}
              </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Image source={require('@/assets/images/icons/EcoinsIcon.svg')}
                    style={{height: 15,width: 10, tintColor: '#979BFF'}} />
              <Text style={styles.text}>
                {item.coins}
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    gap: 18,
  },
  title: {
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 27.12,
    fontFamily: 'Inter',
  },
  subTitle: {
    color: '#2D3748',
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
  userConteiner: {
    width: 350,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  text: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 18.08,
    fontFamily: 'Inter',
  },
  button: {
    backgroundColor: "#BFFF97",
    borderRadius: 14,
    width: 350,
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  }
});
