import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

type slideTypes = {
    title:  string;
    text: string;
    image: any;
    index: number;
}

type CarouselItemProps = {
    item: slideTypes,
    setActiveSlide:  React.Dispatch<React.SetStateAction<number>> ,
    setShowCarousel: React.Dispatch<React.SetStateAction<boolean>>
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ item , setActiveSlide, setShowCarousel}) => {
    const changeActiveTab = () => {
        setActiveSlide((slide) => slide + 1)
    }
    return (
        <View style={styles.slide}>
          <Text style={styles.phase}>{item.title}</Text>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.text}>{item.text}</Text>
            {item.index === 4 ? (
                <TouchableOpacity style={styles.button} onPress={() => setShowCarousel(false)}>
                <Text style={styles.buttonText}>ЗАКРЫТЬ</Text>
                </TouchableOpacity>
            ): (
                <TouchableOpacity style={styles.button} onPress={changeActiveTab}>
                <Text style={styles.buttonText}>ДАЛЕЕ</Text>
              </TouchableOpacity>
            )
            }
        </View>
      );
}

const styles = StyleSheet.create({
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    phase: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    image: {
      resizeMode: 'contain',
    },
    text: {
      fontSize: 14,
      textAlign: 'center',
      marginVertical: 10,
    },
    button: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#32CD32',
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
  });