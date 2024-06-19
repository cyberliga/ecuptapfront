import { X } from '@tamagui/lucide-icons'
import { StyleSheet, View, Text } from "react-native";
import { Button } from 'tamagui';

type RoadMapProps = {
  setCloseTab: () => void,
}
type dataTypes = {
  month: string,
  descr: string,
}

const RoadMap = ({setCloseTab}: RoadMapProps )=> {
  const data: dataTypes[] = [
    {
      month: 'May',
      descr: ' Quality comes first. We took our time to plan our everything and build our production pipeline.'
    },
    {
      month: 'June',
      descr: ' Quality comes first. We took our time to plan our everything and build our production pipeline.'
    },
    {
      month: 'June',
      descr: 'Quality comes first. We took our time to plan our everything and build our production pipeline.'
    },
    {
      month: 'June',
      descr: 'Quality comes first. We took our time to plan our everything and build our production pipeline.'
    },
  ]
  return (
    <View style={styles.roadmapWrapper}>
        <Text style={styles.roadmapTitle}>
            Roadmap
        </Text>
        <Button onPress={setCloseTab} style={styles.roadmapButton}>
          <X color='#FFFFFF' />
        </Button>
      
      {data.map((item) => (
        <View style={styles.roadmapItemWrapper} >
          <Text style={styles.roadmapMonth}>
              {item.month}
          </Text>
          <Text style={styles.roadmapDescr}>
              {item.descr}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  roadmapWrapper: {
    flex: 1,
    backgroundColor: '#171C26',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: 20,
    // borderTopWidth: 1, 
    // borderTopColor: '#C2C2C2', 
  },
  roadmapButton: {
    backgroundColor: '#171C26',
    width: 30,
    height: 30,
    padding: 0,
  },
  roadmapTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 27.12,
    fontFamily: 'Inter',
  },
  roadmapItemWrapper : {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  roadmapMonth: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    fontFamily: 'Inter',
  },
  roadmapDescr: {
    color: '#C2C2C2',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'Inter',
  }
});

export default RoadMap;