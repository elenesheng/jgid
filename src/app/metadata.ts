import type { Metadata } from 'next';
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
