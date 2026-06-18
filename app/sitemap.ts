import { MetadataRoute } from 'next'

const BASE = 'https://mystermyself.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes = [
    '/',
    '/opportunity-list',
    '/welcome',
    '/follow-the-coast',
    '/coast',
    '/coast/route-harbor',
    '/coast/market-marina',
    '/coast/blueprint-bay',
    '/coast/creator-pier',
    '/coast/fantasy-island',
    '/coast/flavor-district',
    '/coast/library-vault',
    '/coast/legacy-point',
    '/resources',
    '/products/medical-courier-guide',
    '/breaded',
    '/trading-chef',
    '/academy',
    '/passport',
    '/pricing',
    '/about',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/refund',
    '/affiliate-disclosure',
  ]

  return staticRoutes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route === '/opportunity-list' ? 0.9 : 0.7,
  }))
}
