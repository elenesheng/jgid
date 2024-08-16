import { Box, Container, Stack } from "@chakra-ui/react";
import TimerContainer from './components/timer';
import TodoComponent from "./components/to-do/Todo.component";
import type { Metadata } from 'next';
import GoalProgress from "./components/progress/GoalProgress.component";

export const metadata: Metadata = {
  title: 'Ticky - Simple & Effective Task Management',
  description: 'Ticky offers a straightforward, easy-to-use task management solution designed to enhance productivity without the complexity of other apps.',

  openGraph: {
    title: 'Ticky - Simple & Effective Task Management',
    description: 'Ticky offers a straightforward, easy-to-use task management solution designed to enhance productivity without the complexity of other apps.',
    url: 'https://www.ticky.app/',
    siteName: 'Ticky',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Ticky Logo'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@TickyApp',
    title: 'Ticky - Simple & Effective Task Management',
    description: 'Ticky offers a straightforward, easy-to-use task management solution designed to enhance productivity without the complexity of other apps.',
    images: [
      {
        url: '/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Ticky Logo'
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
