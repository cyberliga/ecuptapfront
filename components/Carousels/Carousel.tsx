import React, {Dispatch, SetStateAction, useState} from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { CarouselItem } from './CarouselItem';

type slideTypes = {
    title:  string;
    text: string;
    image: any;
    index: number;
}

type CarouselProps = {
  setShowCarousel: Dispatch<React.SetStateAction<boolean>>,
}

const slides: slideTypes[] = [
  {
    index: 0,
    title: 'ПЕРВАЯ ФАЗА',
    text: 'ИГРА УЖЕ НАЧАЛАСЬ.\nВаша задача накопить стартовый капитал...',
    image: require('@/assets/images/comingSoonImg.svg'),
  },
  {
    index: 1,
    title: '2 ФАЗА',
    text: 'ИГРА УЖЕ НАЧАЛАСЬ.\nВаша задача накопить стартовый капитал...',
    image: require('@/assets/images/comingSoonImg.svg'),
  },
  {
    index: 2,
    title: '3 ФАЗА',
    text: 'ИГРА УЖЕ НАЧАЛАСЬ.\nВаша задача накопить стартовый капитал...',
    image: require('@/assets/images/comingSoonImg.svg'),
  },
  {
    index: 3,
    title: '4 ФАЗА',
    text: 'ИГРА УЖЕ НАЧАЛАСЬ.\nВаша задача накопить стартовый капитал...',
    image: require('@/assets/images/comingSoonImg.svg'),
  },
  {
    index: 4,
    title: '4 ФАЗА',
    text: 'ИГРА УЖЕ НАЧАЛАСЬ.\nВаша задача накопить стартовый капитал...',
    image: require('@/assets/images/comingSoonImg.svg'),
  },
];

const Carousel = ({ setShowCarousel }:  CarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  return (
  <View>
     <CarouselItem item={slides[activeSlide]} setActiveSlide={setActiveSlide} setShowCarousel={setShowCarousel}/>
  </View>
  );
};

export default Carousel;