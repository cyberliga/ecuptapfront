import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { getQuery } from "@/app/api/hooks/getQuery"

type slideTypes = {
  title: string;
  subTitle: string;
  text: string;
  image: any;
  index: number;
}

type CarouselItemProps = {
  item: slideTypes,
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>,
  setShowCarousel: React.Dispatch<React.SetStateAction<boolean>>
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ item, setActiveSlide, setShowCarousel }) => {
  require('@/assets/js/telegram-web-app');

  const { title, subTitle, text, image, index } = item;
  const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const tg_user_id = tg_user ? tg_user.id : 412037449;

  const changeActiveTab = () => {
    setActiveSlide((slide) => slide + 1)
  }
  const changeOnboarderStatus = () => {
    getQuery<any>(`/users/${tg_user_id}/onboarded`);
    setShowCarousel(false)
  }

  return (
    <View style={styles.slide}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.title}>{ title}</Text>
      <Image source={image} style={styles.image} />
      <Text style={styles.subTitle}>{subTitle}</Text>
      {index === 4 ? (
        <TouchableOpacity style={styles.button} onPress={() => changeOnboarderStatus()}>
          <Text style={styles.buttonText}>ЗАКРЫТЬ</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={changeActiveTab}>
          <Text style={styles.buttonText}>ДАЛЕЕ</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    height: '100%',
    backgroundColor: '#171923',
    justifyContent: 'space-between',
  },
  image: {
    resizeMode: 'contain',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4EF2FF',
    borderRadius: 14,
    width: 300,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  title: {
    fontSize: 21,
    fontWeight: 600,
    lineHeight: 23,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  text: {
    backgroundColor: '#000000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 13,
    fontWeight: 800,
    lineHeight: 14.69,
    color: '#FFFFFF',
    borderRadius: 34,
  },
});