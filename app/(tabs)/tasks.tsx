import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'tamagui'

export default function TasksTab() {
    const dataTasks = [
        {
            title: 'Subscribe to ECUP.PRO Telegram',
            score: 1000,
            done: false,
        },
        {
            title: 'Join ECUP’s Discord',
            score: 200,
            done: false,
        },
        {
            title: 'Invite 5 friends',
            score: 1000,
            done: false,
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
            <View style={styles.tasksWrapper}>
                {dataTasks.map((item, index)=> (
                    <View key={index} style={styles.tasksContainer}>
                        <View style={{display: 'flex', gap: 5}}>
                            <Text style={styles.taskDescrTitle}>
                                {item.title}
                            </Text>
                            <Text style={styles.taskDescrScore}>
                                <span style={styles.taskDescrScoreSpan}>+ </span>{item.score}{` `}
                                <Image style={{
                                    height: 12,
                                    width: 7,
                                    tintColor: '#979BFF'
                                }} source={require("../../assets/images/icons/EcoinsIcon.svg")} />
                            </Text>
                        </View>
                        {/* <Button style={styles.taskButton}> 
                            Claim
                        </Button> */}
                        <Button style={styles.taskButtonClaimed} disabled> 
                            Claimed
                        </Button>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        display: 'flex',
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
        width: 350,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, 
    tasksWrapper: {
        borderTopColor: '#EBEBEB',
        borderTopWidth: 1,
        paddingTop: 50,
        display: 'flex',
        gap: 26,
    },
    taskDescrTitle: {
        fontWeight: 500,
        fontSize: 14,
        color: '#000000',
    },
    taskDescrScoreSpan: {
        fontWeight: 500,
        fontSize: 12,
        color: '#000000',
    },
    taskDescrScore: {
        fontWeight: 500,
        fontSize: 12,
        color: '#979BFF',
    },
    taskButton: {
        backgroundColor: "#BFFF97",
        borderRadius: 25,
    },
    taskButtonClaimed: {
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderTopWidth: 1,
    }
});