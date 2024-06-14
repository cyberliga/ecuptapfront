import { useEffect, useState } from "react";
import { Text, StyleSheet } from 'react-native';
import { secondsForFarm } from '@/app/api/utils'


interface TimerProps {
    finishDate: number
}

export default function Timer(props: TimerProps) {
    const [date, setDate] = useState("")
    console.log

    useEffect(() => {
        let remainingSeconds = secondsForFarm(props.finishDate);
        const interval = setInterval(() => {
            if (remainingSeconds >= 0) {
                formatTime(remainingSeconds);
                remainingSeconds--;
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs} `;

        setDate(formattedTime)

        return formattedTime;
    }

    return (
        <Text style={styles.buttonTextSpan}>
            {date}
        </Text>
    )
}

const styles = StyleSheet.create({
    buttonTextSpan: {
        fontSize: 14,
        position: 'absolute',
        right: 270,
    }
});