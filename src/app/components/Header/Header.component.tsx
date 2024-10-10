"use client";

import React from "react";
import { Box, Flex, Container } from "@chakra-ui/react";
import Logo from "./Logo/Logo";
import ThemeSwitcher from "@/app/components/theme/Theme";
import UserProfile from "../AuthButton";
import SettingsModal from "../settings/Settings.component";

const Header = () => (
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
        <Flex alignItems="center" flex="1">
          <SettingsModal />
          <ThemeSwitcher />
        </Flex>

        <Flex justifyContent="center" flex="1">
          <Logo />
        </Flex>
        
        <Flex justifyContent="flex-end" alignItems="center" flex="1">
          <UserProfile />
        </Flex>
      </Flex>
    </Container>
  </Box>
);

export default Header;
