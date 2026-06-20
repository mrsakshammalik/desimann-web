import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { SITE_CONFIG, PRODUCTS } from "@/lib/constants";
import { LEGAL_PAGES } from "./legal/content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // 1. Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // 2. Product Pages
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Legal Pages
  const legalRoutes: MetadataRoute.Sitemap = Object.keys(LEGAL_PAGES).map((slug) => ({
    url: `${baseUrl}/legal/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.3,
  }));

  try {
    // 4. Blog Posts
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // 5. Blog Categories
    const categories = await prisma.blogCategory.findMany({
      select: { slug: true, updatedAt: true },
    });

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${baseUrl}/blog/category/${cat.slug}`,
      lastModified: cat.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    return [
      ...staticRoutes,
      ...productRoutes,
      ...blogRoutes,
      ...categoryRoutes,
      ...legalRoutes,
    ];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error);
    return [
      ...staticRoutes,
      ...productRoutes,
      ...legalRoutes,
    ];
  }
}
