import { useState, useEffect } from 'react';
import { StyleSheet, Image } from "react-native";
import { manipulateAsync, SaveFormat, ImageResult } from 'expo-image-manipulator';
import { Asset } from 'expo-asset';

const LoaderImg = () => {
  const originalFile = "@/assets/images/preloader.webp"

  const [image, setImage] = useState<ImageResult>();

  useEffect(() => {
    (async () => {
      const image = Asset.fromModule(require(originalFile));
      await image.downloadAsync().then(async () => {
        const manipResult = await manipulateAsync(
          image.localUri || image.uri,
          [{ resize: { width: 375, height: 812 } }],
          { compress: 0.5 }
        );

        setImage(manipResult);
      });
    })();
  }, []);


  return (
    <>
      <Image source={{ uri: image?.uri }} style={styles.image} ></Image>
    </>

  );
};


const styles = StyleSheet.create({
  image: {
    width: "100%",
    maxWidth: 375,
    maxHeight: 812,
    height: "100%"
  }
});

export default LoaderImg;