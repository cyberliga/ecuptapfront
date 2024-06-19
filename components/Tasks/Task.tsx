import { View, Text, StyleSheet, Image, Alert, Linking } from 'react-native';
import { useCallback, useState } from 'react'
import { baseUrl } from "@/app/api/hooks/utils";
import { Button } from 'tamagui';
import { Tasks, Task } from '@/app/api/schema'
import Loader from '@/components/Loader';
import { useMutation } from '@/app/api/hooks/useMutation';
import MainActionButton from '@/components/Buttons/MainButton'

import NonActionButton from "@/components/Buttons/NonActionButton"
import { ReactNode } from "react"



type OpenURLButtonProps = {
    url: string;
    children: ReactNode;
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

    const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
        const handlePress = useCallback(async () => {
            webApp?.openTelegramLink(url)
            taskStart({ args: {} })
            setTaskStatus(TaskStatus.IN_PROGRESS)
        }, [url]);

        return <MainActionButton size={{ width: "$9", height: "$1.5" }} callback={handlePress} >{children}</MainActionButton>;
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
                    }} source={require("@/assets/images/icons/colorEcoinsIcon.svg")} />
                    {task.task.reward}{` `}
                </Text>
            </View>
            {
                (taskStatus === "NOT_STARTED") ? (
                    <OpenURLButton url={task.task?.url} >
                        Go
                    </OpenURLButton>
                ) : taskStatus === "IN_PROGRESS" ? (
                    <MainActionButton size={{ width: "$9", height: "$1.5" }} callback={handleClaimClick}>
                        <Loader size={15} color={'#FFFFFF'} />
                        <span>Claim</span>
                    </MainActionButton>
                ) : (
                    <NonActionButton size={{ width: "$9", height: "$1.5" }}>
                        <Image source={require("@/assets/images/icons/claimedIcons.svg")}></Image>
                        <span>Claimed</span>
                    </NonActionButton>
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
});