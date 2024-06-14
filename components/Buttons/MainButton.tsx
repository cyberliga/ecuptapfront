import { ReactNode } from 'react'
import { Text, StyleSheet, Image } from "react-native"
import { Button } from "tamagui"

interface ButtonSize {
    height: number
    width: number
}

type ButtonProps = {
    size: ButtonSize,
    onClickHandler: any,

}

export default function MainButton(props: ButtonProps) {
    styles.button.width = props.size.width
    styles.button.height = props.size.height

    return (
        <Button style={styles.button} onPress={props.onClickHandler}></Button>
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