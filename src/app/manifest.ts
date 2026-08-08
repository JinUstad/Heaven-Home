import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Heaven Home | Premium Kitchen Essentials',
    short_name: 'Heaven Home',
    description: 'Discover Heaven Home\'s premium kitchenware, elegant organizers, smart kitchen dispensers, and modern essentials.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#1d3227',
    categories: ['shopping', 'lifestyle', 'home', 'kitchen'],
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/logo.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png',
        sizes: '120x120',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
