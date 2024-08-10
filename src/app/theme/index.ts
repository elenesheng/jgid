import { extendTheme, useColorMode, type ThemeConfig } from "@chakra-ui/react";
import { colors, primary } from "./foundations/colors";
import typography from "./foundations/typography";
import breakpoints from "./foundations/breakpoints";
import borders from "./foundations/borders";
import spaces from "./foundations/spaces";
import LinkStyles from "./components/Link";
import ButtonStyles from "./components/Button";
import SelectStyles from "./components/Select";
import "@fontsource/playfair-display";
import "@fontsource/lato";
import "typeface-crimson-text";
import "@fontsource/noto-sans/400.css";

const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    breakpoints,
    semanticTokens: {
        colors,
    },
    colors: {
        primary,
    },
    space: spaces,
    borders,
    typography,
    components: {
        Button: ButtonStyles,
        Link: LinkStyles,
        Select: SelectStyles,
    },
    styles: {
        global: {
            body: {
                bg: "bg",
                lineHeight: "base",
                'h1': {
                    FontWeight: 700,
                    fontSize: '40px'
                },
                'h2': {
                    FontWeight: 700,
                    fontSize: '30px'
                },
                'h3': {
                    FontWeight: 700,
                    fontSize: '25px'
                },
                'h4': {
                    FontWeight: 700,
                    fontSize: '20px'
                },
                'ul': {
                    marginInlineStart: '18px'
                }
            },
        },
    },
    fonts: {
        body: "Noto Sans, sans-serif",
        heading: "playfair-display, sans-serif",
    },
    shadows: {
        sm: "0 2px 5px rgba(0, 0, 0, 0.1)",
        md: "0 2px 5px rgba(0, 0, 0, 0.2)",
        lg: "0px 8px 12px rgba(0, 0, 0, 0.1)",
        xl: "0px 12px 20px rgba(0, 0, 0, 0.2)",
    },
});

export default theme;
