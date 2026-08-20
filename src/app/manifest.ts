import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Heaven Jewels | Premium Kitchen Essentials',
    short_name: 'Heaven Jewels',
    description: 'Discover Heaven Jewels\'s premium kitchenware, elegant organizers, smart kitchen dispensers, and modern essentials.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#1d3227',
    categories: ['shopping', 'lifestyle', 'home', 'kitchen'],
    icons: [
      {
        src: '/heavenjewels.PNG',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/heavenjewels.PNG',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/heavenjewels.PNG',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/heavenjewels.PNG',
        sizes: '120x120',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
