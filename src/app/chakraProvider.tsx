'use client'

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme'
import '@fontsource/playfair-display';
import '@fontsource/lato';

export function ChakraUiProvider({ children }: { children: React.ReactNode }) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
