
import { MetadataRoute } from 'next';

/**
 * Generates the robots.txt file for the website.
 * This file tells search engine crawlers which pages they can or cannot request from your site.
 * @returns {MetadataRoute.Robots} The robots object for Next.js to generate the file.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://bharath-kiran.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
