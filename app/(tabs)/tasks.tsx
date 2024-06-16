import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'tamagui'
import { useQuery } from '../api/hooks/useQuery';
import { Tasks } from '@/app/api/schema'
import Loader from '@/components/Loader';

export default function TasksTab() {
    const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    const tg_user_id = tg_user ? tg_user.id : 412037449;
    const { data, isLoading } = useQuery<Tasks>(`/users/${tg_user_id}/tasks`);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Tasks
            </Text>
            <Text style={styles.subTitle}>
                Earn more coins by doing tasks
            </Text>
           {isLoading ? <Loader /> :(
            <>
                <View style={styles.tasksWrapper}>
                    {data?.tasks?.map((item, index) => (
                        <View key={index} style={styles.tasksContainer}>
                            <View style={{ display: 'flex', gap: 5 }}>
                                <Text style={styles.taskDescrTitle}>
                                    {item.task?.text_ru}
                                </Text>
                                <Text style={styles.taskDescrScore}>
                                    <span style={styles.taskDescrScoreSpan}>+ </span>{item.task?.reward}{` `}
                                    <Image style={{
                                        height: 12,
                                        width: 7,
                                        tintColor: '#4EF2FF'
                                    }} source={require("../../assets/images/icons/EcoinsIcon.svg")} />
                                </Text>
                            </View>     
                            <Button style={styles.taskButton}>
                                Claim
                            </Button>
                            {/* <Button style={styles.taskButtonClaimed} disabled> */}
                            {/* Claimed */}
                            {/* </Button> */}
                        </View>
                    ))}
                </View>
            </>
           )}
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
        backgroundColor: '#171C26',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 27.12,
        fontFamily: 'Inter',
    },
    subTitle: {
        color: '#EBEBEB',
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
        color: '#FFFFFF',
    },
    taskDescrScoreSpan: {
        fontWeight: 500,
        fontSize: 12,
        color: '#FFFFFF',
    },
    taskDescrScore: {
        fontWeight: 500,
        fontSize: 12,
        color: '#4EF2FF',
    },
    taskButton: {
        backgroundColor: "#4EF2FF",
        borderRadius: 7,
        color: "#141414",
        fontWeight: 700,
        height: 24
    },
    taskButtonClaimed: {
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderTopWidth: 1,
    }
});