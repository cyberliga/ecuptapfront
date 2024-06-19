import { config } from '@tamagui/config/v3'

import { createTamagui, createFont, createTokens } from 'tamagui'

const interFont = createFont({
  family: 'Inter',
  size: {
    1: 12,
    2: 14,
    3: 15,
  },
  lineHeight: {
    // 1 will be 22
    2: 22,
  },
  weight: {
    1: '300',
    // 2 will be 300
    3: '600',
  },
  letterSpacing: {
    1: 0,
    2: -1,
    // 3 will be -1
  },
  // (native only) swaps out fonts by face/style
  face: {
    300: { normal: 'InterLight', italic: 'InterItalic' },
    600: { normal: 'InterBold' },
  },
})

export const tokens = createTokens(
  {
    size: { ...config.tokens.size, mainButtonSize: 350 },
    radius: config.tokens.radius,
    zIndex: config.tokens.zIndex,
    space: config.tokens.space,
    color: config.tokens.color,
    actionButton: {
      backgroundColor: "#4EF2FF",
      textColor: "#141414",
      borderRadius: 7
    },
    nonActionButton: {
      backgroundColor: "#171C26",
      textColor: "#FFFFFF",
      borderColor: '#FFFFFF',
      borderRadius: "$5"
    },
    icon: {
      small: 16,
      medium: 24,
      large: 32,
    }
  }
)

const customConfig = {
  ...config,
  tokens,


}


const tamaguiConfig = createTamagui(customConfig)


type Conf = typeof tamaguiConfig

declare module 'tamagui' {

  interface TamaguiCustomConfig extends Conf { }

}
export default tamaguiConfig
// depending on if you chose tamagui, @tamagui/core, or @tamagui/web
// be sure the import and declare module lines both use that same name
