import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { CarouselItem } from './CarouselItem';

type slideTypes = {
  title: string;
  text: string;
  subTitle: string;
  image: any;
  index: number;
}

type CarouselProps = {
  setShowCarousel: Dispatch<React.SetStateAction<boolean>>,
}

const slides: slideTypes[] = [
  {
    index: 0,
    text: 'ПЕРВАЯ ФАЗА',
    title: 'Игра уже началась.',
    subTitle: 'Ваша задача накопить стартовый капитал на создание своей киберспортивной команды для следующей фазы игры.',
    image: require('@/assets/images/slideOneImg.svg'),
  },
  {
    index: 1,
    text: 'ПЕРВАЯ ФАЗА',
    title: 'Уже сейчас начинайте фармить монеты',
    subTitle: 'Чтобы далее использовать их в новой механике - пошаговой стратегии и PVP в следующей фазе игры.',
    image: require('@/assets/images/slideTwoImg.svg'),
  },
  {
    index: 2,
    text: 'ПЕРВАЯ ФАЗА',
    title: 'Ваша главная задача -  развивать команду. ',
    subTitle: 'Чем сильнее команда, тем больше вы сможете заработать токенов в последующем игровом формате.',
    image: require('@/assets/images/slideThreeImg.svg'),
  },
  {
    index: 3,
    text: 'ПЕРВАЯ ФАЗА',
    title: 'Токены залисстим и тд',
    subTitle: 'Уже сейчас вы можете начать фармить валюту чтобы потом ее потратить на развитие команды и стать одним из лидеров игры',
    image: require('@/assets/images/slideFourImg.svg'),
  },
  {
    index: 4,
    text: 'ПЕРВАЯ ФАЗА',
    title: 'Добро пожаловать к нам в экосистему ECUP.PRO',
    subTitle: 'Весь кайф в том, что заработанные токены вы сможете использовать на других наших сервисах, разработка которых сейчас активно ведется. У нас уже есть своя турнирная площадка ECUP.PRO',
    image: require('@/assets/images/slideFiveImg.svg'),
  },
];

const Carousel = ({ setShowCarousel }: CarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  return (
    <View style={{height: '100%', backgroundColor: '#171923'}}>
      <CarouselItem item={slides[activeSlide]} setActiveSlide={setActiveSlide} setShowCarousel={setShowCarousel} />
    </View>
  );
};

export default Carousel;