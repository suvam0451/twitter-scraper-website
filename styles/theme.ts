import { theme } from "@chakra-ui/react"

export const customTheme = {
    ...theme,
    color: {
        ...theme.colors,
        "dark.menu": "#161F31"
    }
}

export const DARK_MENU_BACKGROUND = "dark.menu"