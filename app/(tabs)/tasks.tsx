import { View, StyleSheet } from 'react-native';
import { Text } from 'tamagui'
import { useQuery } from '../api/hooks/useQuery';
import { Tasks } from '@/app/api/schema'
import Loader from '@/components/Loader';
import TaskComponent from "@/components/Tasks/Task"

export default function TasksTab() {
    const webApp = window.Telegram?.WebApp
    const thUser = webApp.initDataUnsafe?.user;
    const tgUserId: number = thUser ? thUser.id : 412037449;
    const tguserLanguage = thUser ? thUser.language_code : "en"
    const { data, isLoading } = useQuery<Tasks>(`/users/${tgUserId}/tasks`);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Tasks
            </Text>
            <Text style={styles.subTitle}>
                Earn more coins by doing tasks
            </Text>
            {isLoading ? <Loader /> : (
                <>
                    <View style={styles.tasksWrapper}>
                        {data?.tasks?.map((item, index) => (
                            <TaskComponent key={index} task={item} tgUserId={tgUserId} tgUserLanguage={tguserLanguage} />
                        ))}
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
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
    tasksWrapper: {
        paddingTop: 10,
        display: 'flex',
        gap: 8
    }
});