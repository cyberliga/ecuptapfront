import { useEffect, useState } from "react";
import { Text, Image, styled } from 'tamagui'
import { secondsForFarm } from '@/app/api/utils'

type TimerProps = {
    finishDate: number,
    startFarmDate: number,
    ratePerHour: number,
}

export const MainButtonContent = ({ finishDate, startFarmDate, ratePerHour }: TimerProps) => {
    const [date, setDate] = useState<string>("");
    const [score, setScore] = useState<number>(0);

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
    };

    const getTotalFarmValue = () => {
        return Math.round((((new Date().getTime() / 1000 - startFarmDate)) * ratePerHour / 60 / 60))
    };

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs} `;

        setDate(formattedTime)
        setScore(getTotalFarmValue)
        return formattedTime;
    };

    return (
        <>
            <TimerTextStyled >
                {date}
            </TimerTextStyled>
            <ClaimTextStyled>
                <Image style={{ height: 13.45, width: 8.75, marginTop: -1 }}
                    source={require('@/assets/images/icons/EcoinsIcon.svg')} />
                {score}
                <span>Claim</span>
            </ClaimTextStyled>
        </>
    )
};

const TimerTextStyled = styled(Text, {
    fontSize: 14,
    position: 'absolute',
    right: 270,
})

const ClaimTextStyled = styled(Text, {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: "$actionButton.textColor",
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 28,
    hoverStyle: {}
})
