import { Button, styled } from "tamagui"
import { ReactNode } from "react"

type ButtonSize = {
    height: string
    width: string
}

type ButtonProps = {
    size: ButtonSize,
    callback?: () => void,
    children?: ReactNode,
}

const CONFIG_ATTRIBUT_NAME = "$actionButton"

export default function MainActionButton({ size, callback, children }: ButtonProps) {
    return (
        <MainActionButtonStyle width={"$0"} height={size.height} onPress={callback}>
            {children}
        </MainActionButtonStyle>
    )
}

const MainActionButtonStyle = styled(Button, {
    padding: 0,
    margin: 10,
    // borderRadius: `${CONFIG_ATTRIBUT_NAME}.borderRadius`,
    borderRadius: 7,
    borderWidth: 0,
    cursor: "pointer",
    opacity: 0.8,
    backgroundColor: `${CONFIG_ATTRIBUT_NAME}.backgroundColor`
})
