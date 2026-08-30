import type { MetadataRoute } from 'next';

import { areas } from '@/data/areas';
import { categories } from '@/data/categories';
import { getAllJobs } from '@/lib/jobs';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/vagas', '/categorias', '/sobre'].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));

  const areaRoutes = areas.map((area) => ({
    url: `${site.url}/areas/${area.slug}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${site.url}/categorias/${category.slug}`,
    lastModified: new Date(),
  }));

  const jobRoutes = getAllJobs().map((job) => ({
    url: `${site.url}/vagas/${job.slug}`,
    lastModified: new Date(job.publishedAt),
  }));

  return [...staticRoutes, ...areaRoutes, ...categoryRoutes, ...jobRoutes];
}
