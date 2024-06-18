import { View, Text, StyleSheet, Image, Alert, Linking } from 'react-native';
import { useCallback, useState } from 'react'
import { baseUrl } from "@/app/api/hooks/utils";
import { Button } from 'tamagui';
import { Tasks, Task } from '@/app/api/schema'
import Loader from '@/components/Loader';
import { useMutation } from '@/app/api/hooks/useMutation';

type OpenURLButtonProps = {
    url: string;
    children: any;
    style: any
};

type TaskProps = {
    tgUserLanguage: string,
    tgUserId: number,
    task: Task
}


enum TaskStatus {
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export default function TaskComponent({ tgUserLanguage, tgUserId, task }: TaskProps) {
    const webApp = window.Telegram?.WebApp
    const [taskStatus, setTaskStatus] = useState(task.status)

    const { mutate: taskStart, loading: taskIsLoading } = useMutation<any>({
        path: `/users/${tgUserId}/tasks/${task.task.sort}/start`, method: "POST", queryKeyRefetch: [
            `/users/${tgUserId}/tasks/${task.task.sort}/start`,
        ],
    });

    const OpenURLButton = ({ url, children, style }: OpenURLButtonProps) => {
        const handlePress = useCallback(async () => {
            webApp?.openTelegramLink(url)
            taskStart({ args: {} })
            setTaskStatus(TaskStatus.IN_PROGRESS)
        }, [url]);

        return <Button style={style} onPress={handlePress} >{children}</Button>;
    };

    const { mutate, loading } = useMutation<any>({
        path: `/users/${tgUserId}/tasks/${task.task.sort}/claim-reward`, method: "POST", queryKeyRefetch: [
            `/users/${tgUserId}/tasks/${task.task.sort}/claim-reward`,
        ],
    });

    const handleClaimClick = () => {
        mutate({ args: {} })
        setTaskStatus(TaskStatus.DONE)
    }


    return (
        <View style={styles.tasksContainer}>
            <View style={{ display: 'flex', gap: 5 }}>
                <Text style={styles.taskDescrTitle}>
                    {tgUserLanguage === "en" ? task.task.text.en : task.task.text.ru}
                </Text>
                <Text style={styles.taskDescrScore}>
                    <span style={styles.taskDescrScoreSpan}>+ </span>
                    <Image style={{
                        height: 12,
                        width: 7,
                        marginRight: 3,
                    }} source={require("../../assets/images/icons/colorEcoinsIcon.svg")} />
                    {task.task.reward}{` `}
                </Text>
            </View>
            {
                (taskStatus === "NOT_STARTED") ? (
                    <OpenURLButton url={task.task?.url} style={styles.taskButton} >
                        Go
                    </OpenURLButton>
                ) : taskStatus === "IN_PROGRESS" ? (
                    <Button style={styles.taskButtonClaim} onPress={handleClaimClick}>
                        <Loader size={15} color={'#FFFFFF'} />
                        Claim
                    </Button>
                ) : (
                    <Button style={styles.taskButtonClaim} disabled>
                        Claimed
                    </Button>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    tasksContainer: {
        width: 350,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#2D3748',
        borderBottomWidth: 1,
        paddingVertical: 13,
    },
    tasksWrapper: {
        paddingTop: 50,
        display: 'flex',
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
        display: 'flex',
        alignItems: 'center',
    },
    taskButton: {
        backgroundColor: "#4EF2FF",
        borderRadius: 7,
        color: "#141414",
        fontWeight: 700,
        height: 24,
    },
    taskButtonClaim: {
        borderRadius: 25,
        backgroundColor: '#171C26',
        borderColor: '#FFFFFF',
        color: "#FFFFFF",
        borderTopWidth: 1,
        height: 24,
    }
});