import borders from "../foundations/borders";
import spaces from "../foundations/spaces";
import {colors} from "../foundations/colors";

const ButtonStyles = {
    baseStyle: {
        fontWeight: "bold",
        textTransform: "uppercase",
        borderRadius: "md",
        borderWidth: borders.xxl,
        borderColor: "primaryDark",
        paddingX: spaces.md,
        paddingY: spaces.sm,
        marginY: spaces.sm,
    },
    sizes: {
        sm: {
            fontSize: "sm",
            paddingX: spaces.sm,
            paddingY: spaces.xs,
        },
        md: {
            fontSize: "md",
            paddingX: spaces.md,
            paddingY: spaces.sm,
        },
        lg: {
            fontSize: "lg",
            paddingX: spaces.lg,
            paddingY: spaces.md,
        },
    },
    variants: {
        _disabled: {
            bg: "gray",
            cursor: 'not-allowed',
            opacity: 0.4,
            color: "white"
        },
        primary: {
            color: "white",
            bg: "accent",
            _hover: {
                bg: "accent",
                boxShadow: 'md',
            },
        },
        secondary: {
            color: "black",
            bg: "gray",
            border: "1px solid",
            _hover: {
                // bg: "gray",
                
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            },
        },
        ghost: {
            _hover: {
                bg: "secondary"
            }
        },
    },
    defaultProps: {
        variant: "primary",
        size: "md",
    },
};

export default ButtonStyles;
