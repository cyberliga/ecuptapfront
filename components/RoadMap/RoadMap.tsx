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

export const RoadMap = ({setCloseTab}: RoadMapProps )=> {
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
        <View  style={styles.roadmapBorder} />
        <View style={styles.roadmapDescrWrapper} >
          <Text style={styles.roadmapTitle}>
              Roadmap
          </Text>
          <Button onPress={setCloseTab} style={styles.roadmapButton}>
            <X color='#FFFFFF' />
          </Button>
        </View>
      
      {data.map((item, index) => (
        <View style={styles.roadmapItemWrapper} key={index}>
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
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
  },
  roadmapButton: {
    position: 'absolute',
    right: 10,
    top: -10,
    backgroundColor: '#171C26',
    width: 30,
    height: 30,
    padding: 0,
  },
  roadmapBorder: {
    width: '100%',
    height: 30,
    borderTopWidth: 1, 
    borderTopColor: '#C2C2C2',
    borderRadius: 90,
  },
  roadmapTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 27.12,
    fontFamily: 'Inter',
  },
  roadmapDescrWrapper: {
    marginBottom: 20,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  roadmapItemWrapper : {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 15,
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