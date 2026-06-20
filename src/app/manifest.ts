import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Desimann — Authentic Homemade Food',
    short_name: 'Desimann',
    description: "India's most authentic homemade food brand. Traditional recipes, farm-fresh ingredients.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF9F0',
    theme_color: '#D4A017',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
