import { View, Text, StyleSheet, Image, Button } from 'react-native';

export default function TasksTab() {
    const dataTasks = [
        {
            title: 'Subscribe to ECUP.PRO Telegram',
            score: 1000,
            done: false,
            image: require('../../assets/images/icons/homeIcon.svg'),
        },
        {
            title: 'Join ECUP’s Discord',
            score: 200,
            done: false,
            image: require('../../assets/images/icons/homeIcon.svg'),
        },
        {
            title: 'Invite 5 friends',
            score: 1000,
            done: false,
            image: require('../../assets/images/icons/homeIcon.svg'),
        },
    ]
    return (
        <View style={styles.container}>
        <Text style={styles.title}>
            Tasks
        </Text>
        <Text style={styles.subTitle}>
            Earn more coins by doing tasks
        </Text>
        {dataTasks.map((item, index)=> (
            <View key={index}  style={styles.tasksContainer}>
                <View>
                    <Image source={item.image} />
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.score}</Text>
                    </View>
                    <Button title=''>

                    </Button>
                </View>

            </View>
        ))

        }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        gap: 18,
        backgroundColor: '#FFFFFF',
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
    tasksContainer: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 18,
    }
});

declare global {
    interface Window {
        Telegram: any;
    }
  }