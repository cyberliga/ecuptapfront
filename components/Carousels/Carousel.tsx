import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { CarouselItem } from './CarouselItem';

type slideTypes = {
  title: string;
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
    text: '',
    image: require('@/assets/images/firstStep.png'),
  },
  {
    index: 1,
    title: 'ПЕРВАЯ ФАЗА',
    text: '',
    image: require('@/assets/images/secondStep.png'),
  },
  {
    index: 2,
    title: 'ПЕРВАЯ ФАЗА',
    text: '',
    image: require('@/assets/images/thirdStep.png'),
  },
  {
    index: 3,
    title: 'ПЕРВАЯ ФАЗА',
    text: '',
    image: require('@/assets/images/fouthStep.png'),
  },
  {
    index: 4,
    title: 'ПЕРВАЯ ФАЗА',
    text: '',
    image: require('@/assets/images/fithStep.png'),
  },
];

const Carousel = ({ setShowCarousel }: CarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  return (
    <View>
      <CarouselItem item={slides[activeSlide]} setActiveSlide={setActiveSlide} setShowCarousel={setShowCarousel} />
    </View>
  );
};

export default Carousel;