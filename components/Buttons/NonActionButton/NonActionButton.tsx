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

const CONFIG_ATTRIBUT_NAME = "$nonActionButton"

export const NonActionButton = ({ size, callback, children }: ButtonProps) =>  {
    return (
        <NonActionButtonStyle width={size.width} height={size.height} onPress={callback}>
            {children}
        </NonActionButtonStyle>
    )
}

const NonActionButtonStyle = styled(Button, {
    // borderRadius: `${CONFIG_ATTRIBUT_NAME}.borderRadius`,
    borderRadius: "$5",
    backgroundColor: `${CONFIG_ATTRIBUT_NAME}.backgroundColor`,
    borderColor: `${CONFIG_ATTRIBUT_NAME}.borderColor`,
    color: `${CONFIG_ATTRIBUT_NAME}.textColor`,
    borderTopWidth: 1,
    disabled: true
})
