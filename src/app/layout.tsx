import { ChakraUiProvider } from './chakraProvider'
import { Suspense } from 'react';
import { TaskProvider } from "@/app/contexts/TaskContext";
import { TimerProvider } from "@/app/contexts/TimerContext";
import Header from './components/Header/Header.component';
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body>
        <ChakraUiProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <TimerProvider>
            <TaskProvider>
              <Header />
              {children}
            </TaskProvider>
          </TimerProvider>
        </ChakraUiProvider>
      </body>
    </html>
  )
}
