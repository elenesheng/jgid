import { ChakraUiProvider } from './chakraProvider'
import { Suspense } from 'react';
import { TaskProvider } from "@/app/contexts/TaskContext";
import { TimerProvider } from "@/app/contexts/TimerContext";
import Header from './components/Header/Header.component';
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme';
import SessionProvider from "./SessionProvider";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang='en'>
      <body>
        <SessionProvider session={session}>
          <ChakraUiProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <TimerProvider>
              <TaskProvider>
                <Header />
                {children}
              </TaskProvider>
            </TimerProvider>
          </ChakraUiProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
