
import { MetadataRoute } from 'next';

/**
 * Generates the sitemap.xml file for the website.
 * This helps search engines better crawl your site by providing a map of all public pages.
 * @returns {MetadataRoute.Sitemap} An array of sitemap entries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bharath-kiran.vercel.app';

  const routes = [
    '/',
    '/about',
    '/portfolio',
    '/resume',
    '/gallery',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));
}
