// import { useState, useRef, useEffect } from 'react';
// import { View, Text, Image, Modal, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
// import ProgressBar from 'react-native-progress/Bar';

// const { width: screenWidth } = Dimensions.get('window');

// type Story = {
//   id: number;
//   image: any;
//   text: string;
// }

// const stories: Story[] = [
//   { id: 1, image: require('@/assets/images/comingSoonImg.svg'), text: 'Story 1' },
//   { id: 2, image: require('@/assets/images/comingSoonImg.svg'), text: 'Story 2' },
//   { id: 3, image: require('@/assets/images/comingSoonImg.svg'), text: 'Story 3' },
// ];

// export const Carousels = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [activeStory, setActiveStory] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const carouselRef = useRef(null);

//   useEffect(() => {
//     if (modalVisible) {
//       const interval = setInterval(() => {
//         setProgress((prevProgress) => {
//           if (prevProgress >= 1) {
//             clearInterval(interval);
//             goToNextStory();
//             return 0;
//           }
//           return prevProgress + 0.01;
//         });
//       }, 100);

//       return () => clearInterval(interval);
//     }
//   }, [modalVisible, activeStory]);

//   const renderStoryItem = ({ item } : { item: Story }) => (
//     <TouchableOpacity onPress={() => openStory(item.id)}>
//       <Image source={item.image} style={styles.storyImage} />
//       <Text style={styles.storyText}>{item.text}</Text>
//     </TouchableOpacity>
//   );

//   const openStory = (id: number) => {
//     setActiveStory(id - 1);
//     setProgress(0);
//     setModalVisible(true);
//   };

//   const closeStory = () => {
//     setModalVisible(false);
//     setProgress(0);
//   };

//   const goToNextStory = () => {
//     if (activeStory < stories.length - 1) {
//       setActiveStory(activeStory + 1);
//       setProgress(0);
//     } else {
//       closeStory();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Carousel
//         ref={carouselRef}
//         data={stories}
//         renderItem={renderStoryItem}
//         sliderWidth={screenWidth}
//         itemWidth={300}
//         containerCustomStyle={styles.carouselContainer}
//       />
//       <Modal
//         visible={modalVisible}
//         transparent={true}
//         onRequestClose={closeStory}
//       >
//         <View style={styles.modalContainer}>
//           <Image source={stories[activeStory].image} style={styles.modalImage} />
//           <Text style={styles.modalText}>{stories[activeStory].text}</Text>
//           <ProgressBar progress={progress} width={screenWidth * 0.8} color="#fff" />
//           <TouchableOpacity onPress={closeStory} style={styles.closeButton}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   storyImage: {
//     width: 300,
//     height: 300,
//   },
//   storyText: {
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   carouselContainer: {
//     marginTop: 50,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//   },
//   modalImage: {
//     width: 300,
//     height: 300,
//   },
//   modalText: {
//     color: 'white',
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   closeButton: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: 'black',
//   },
// });