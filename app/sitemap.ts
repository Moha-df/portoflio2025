import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

const BASE_URL = 'https://www.moha-df.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${BASE_URL}/projets/${project.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.9 : 0.8,
    })),
  ]
}
