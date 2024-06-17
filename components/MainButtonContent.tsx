import { useEffect, useState } from "react";
import { Text, StyleSheet, Image } from 'react-native';
import { secondsForFarm } from '@/app/api/utils'

type TimerProps = {
    finishDate: number,
    startFarmDate: number,
    ratePerHour: number,
}

export default function MainButtonContent({ finishDate, startFarmDate, ratePerHour }: TimerProps) {
    const [date, setDate] = useState("")
    const [score, setScore] = useState(0)
    useEffect(() => {
        let remainingSeconds = secondsForFarm(finishDate);
        const interval = setInterval(() => {
            if (remainingSeconds >= 0) {
                formatTime(remainingSeconds);
                remainingSeconds--;
            } else {
                setDate("0:00:00")
                setScore(getMaxTotalFarmValue)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [finishDate, startFarmDate]);

    const getMaxTotalFarmValue = () => {
        return Math.round((((finishDate - startFarmDate)) * ratePerHour / 60 / 60))
    }

    const getTotalFarmValue = () => {
        return Math.round((((new Date().getTime() / 1000 - startFarmDate)) * ratePerHour / 60 / 60))
    }

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs} `;

        setDate(formattedTime)
        setScore(getTotalFarmValue)
        return formattedTime;
    }

    return (
        <>
            <Text style={styles.buttonTextSpan}>
                {date}
            </Text>
            <Text style={styles.button_text}><Image style={{ height: 15, width: 10 }}
                source={require('@/assets/images/icons/EcoinsIcon.svg')} />
                {score}
                <span>Claim</span>
            </Text>
        </>
    )
}

const styles = StyleSheet.create({
    buttonTextSpan: {
        fontSize: 14,
        position: 'absolute',
        right: 270,
    },
    button_text: {
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        color: "#141414",
        fontSize: 16,
        fontWeight: 600,
        fontFamily: "Inter-Black",
        lineHeight: 28
    },
});