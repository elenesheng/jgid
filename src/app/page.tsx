import { Box, Container, Stack } from "@chakra-ui/react";
import TimerContainer from './components/timer';
import TodoComponent from "./components/to-do/Todo.component";
import type { Metadata } from 'next';
import GoalProgress from "./components/progress/GoalProgress.component";

export const metadata: Metadata = {
  title: 'Daily TODO with Pomodoro Timer - Boost Your Productivity',
  description: 'Organize your daily tasks efficiently with our integrated Pomodoro Timer. Stay focused and get more done.',

  openGraph: {
    title: 'Daily TODO with Pomodoro Timer - Boost Your Productivity',
    description: 'Organize your daily tasks efficiently with our integrated Pomodoro Timer. Stay focused and get more done.',
    url: 'https://www.dailypom.app/',
    siteName: 'Daily Pom',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Daily Pom Logo'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@DailyPomApp',
    title: 'Daily TODO with Pomodoro Timer - Boost Your Productivity',
    description: 'Organize your daily tasks efficiently with our integrated Pomodoro Timer. Stay focused and get more done.',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Daily Pom Logo'
      }
    ]
  }
}

export default function Home() {
  return (
    <main>
      <Container maxW="container.xl">
        <GoalProgress />
        <Stack direction={['column', 'row']} spacing={10}>
          <Box
            m={0}
            p={0}
            backgroundColor="transparent"
            border="none"
            textAlign="center"
            width={['100%', '45%']}
          >
            <TimerContainer />
          </Box>
          <Box
            border="none"
            backgroundColor="transparent"
            m={0}
            p={0}
            width={['100%', '55%']}
          >
            <TodoComponent />
          </Box>
        </Stack>
      </Container>
    </main>
  );
}
