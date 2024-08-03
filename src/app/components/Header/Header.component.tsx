"use client";

import React from "react";
import { Box, Flex, Container } from "@chakra-ui/react";
import Logo from "./Logo/Logo";
import ThemeSwitcher from "@/app/components/theme/Theme";
import SettingsModalContainer from "../settings";
import UserProfile from "../AuthButton";

const Header = () => {
  return (
    <Box
      p="10px"
      textAlign="center"
      borderRadius="md"
      boxShadow="sm"
      color="primary"
      mb="40px"
    >
      <Container maxW="container.xl">
        <Flex justifyContent="space-between" alignItems="center" p={0}>
          <SettingsModalContainer />
          {/* <Box>
            <Logo />
          </Box> */}
          <Box>
            <Flex>
              <UserProfile />
              <ThemeSwitcher />
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
