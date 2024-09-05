import { ChakraUiProvider } from './chakraProvider'
import { Suspense } from 'react';
import { TimerProvider } from "@/app/contexts/TimerContext";
import Header from './components/Header/Header.component';
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme';
import SessionProvider from "./SessionProvider";
import { getServerSession } from "next-auth/next"
import { authOptions } from './lib/utils/authOptions';
import { TodosProvider } from '@/app/contexts/TodoProvider';
import { QueryProvider } from './queryProvider';

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
              <QueryProvider>
              <TodosProvider>
                <Header />
                {children}
                </TodosProvider>
              </QueryProvider>
            </TimerProvider>
          </ChakraUiProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
