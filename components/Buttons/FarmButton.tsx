import { useState } from 'react'
import { Text, StyleSheet, Image } from "react-native"
import { getQuery } from "@/app/api/hooks/getQuery"
import { claimedTotalCurrent, } from '@/app/api/utils'

import User from "@/app/api/schema"
import MainButton from './MainButton'
import Timer from '../Timer'

export default function FarmButton() {
    require('@/assets/js/telegram-web-app')

    const tg_user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    const tg_user_id = tg_user ? tg_user.id : 412037449;
    const [finishdate, setFinishDate] = useState(0);
    const [startFarmDate, setStartFarmDate] = useState(0);
    const [money, setMoney] = useState(0);
    const [ratePerHour, setRatePerHour] = useState(0);

    const handleClaimClick = async () => {
        const response = getQuery<User>({ path: `/users/${tg_user_id}/claim-farmed-coins` });

        response.then((res: User) => {
            setStartFarmDate(res.farm_start)
            setFinishDate(res.farm_finish)
            setMoney(res.total_coins);
        })
    }
    const claimedTotal = claimedTotalCurrent(startFarmDate, ratePerHour)

    // Не знаю как в таком случае обновлять money. Потому тут нет смысла обновлять, на главном компоненте ничего не меняется
    // Также нужно текст передавать в MainButton, а не ниже его делать

    return (
        <>
            <MainButton size={{ width: styles.button.width, height: styles.button.height }} callback={handleClaimClick} />
            <Text style={styles.button_text}> Farming  <Image style={{ height: 15, width: 10, marginLeft: 5 }}
                source={require("../../assets/images/icons/EcoinsIcon.svg")} />
                {claimedTotal}
            </Text>
            <Timer finishDate={finishdate} />
        </>

    )
}

const styles = StyleSheet.create({
    button: {
        padding: 0,
        margin: 10,
        width: 350,
        height: 62,
        borderRadius: 10,
        borderWidth: 0,
        cursor: "pointer",
        opacity: 0.8,
        backgroundColor: "#BFFF97",
    },
    button_image: {
        padding: 0,
        margin: 10,
        width: 350,
        height: 62,
        borderRadius: 10,
        borderWidth: 0,
        cursor: "pointer",
        opacity: 0.8,
        backgroundColor: "#BFFF97",
    },
    button_text: {
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        color: "#1C4532",
        fontSize: 18,
        fontWeight: 600,
        fontFamily: "Inter-Black",
        lineHeight: 27
    }
});