import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Daily TODO with Pomodoro timer.',
    description: 'A cool app for managing tasks and todos!',
    openGraph: {
        title: 'Daily TODO with Pomodoro timer',
        description: 'A cool app for managing tasks and todos!',
        images: [
            {
                url: '/images/logo.png',
                width: 1200,
                height: 630,
                alt: 'Daily pom',
            },
        ],
    },
};
