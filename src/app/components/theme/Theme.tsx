import { Box, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useColorMode } from "@chakra-ui/react";

function ThemeSwitcher() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box>
            {colorMode === "dark" ? (
                <IconButton
                    aria-label="dark"
                    bg="transparent"
                    fontSize="20px"
                    icon={<FaSun />}
                    color="accent"
                    onClick={toggleColorMode}
                    _hover={{ backgroundColor: "transparent" }}
                />
            ) : (
                <IconButton
                    aria-label="light"
                    bg="transparent"
                    color="accent"
                    icon={<FaMoon />}
                    onClick={toggleColorMode}
                    fontSize="20px"
                    _hover={{ backgroundColor: "transparent" }}
                />
            )}
        </Box>
    );
}

export default ThemeSwitcher;
