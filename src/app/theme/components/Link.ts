import {colors} from "../foundations/colors";

const LinkStyles = {
    baseStyle: {
        textDecoration: "none",
        transition: "color 0.2s",
        _hover: {
            color: "primary",
            textDecoration: "underline",
        },
    },
    variants: {
        inline: {
            display: "inline-block",
            color: "primary",
            fontWeight: "medium",
        },
    },
    defaultProps: {
        variant: "inline",
    },
};

export default LinkStyles;
