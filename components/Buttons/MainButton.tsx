import { Button, styled } from "tamagui"
import { ReactNode } from "react"

interface ButtonSize {
    height: number
    width: number
}

type ButtonProps = {
    size: ButtonSize,
    callback?: () => void,
    children?: ReactNode,
}

export default function MainActionButton({ size, callback, children }: ButtonProps) {
    return (
        <MainActionButtonStyle width={size.width} height={size.height} onPress={callback}>
            {children}
        </MainActionButtonStyle>
    )
}

const MainActionButtonStyle = styled(Button, {
    padding: 0,
    margin: 10,
    borderRadius: "$5",
    borderWidth: 0,
    cursor: "pointer",
    opacity: 0.8,
    backgroundColor: "$mainButton",
})
