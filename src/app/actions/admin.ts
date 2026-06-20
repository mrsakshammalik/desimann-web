"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSeoSettings(formData: FormData) {
  const metaTitle = formData.get("metaTitle") as string;
  const metaDescription = formData.get("metaDescription") as string;
  const keywords = formData.get("keywords") as string;

  await prisma.seoMetadata.upsert({
    where: { id: "global" },
    update: { metaTitle, metaDescription, keywords },
    create: { id: "global", metaTitle, metaDescription, keywords },
  });

  revalidatePath("/", "layout");
}

export async function updateAnalyticsSettings(formData: FormData) {
  const ga4Id = formData.get("ga4Id") as string;
  const metaPixelId = formData.get("metaPixelId") as string;
  const clarityId = formData.get("clarityId") as string;

  await prisma.analyticsTracking.upsert({
    where: { id: "singleton" },
    update: { ga4Id, metaPixelId, clarityId },
    create: { id: "singleton", ga4Id, metaPixelId, clarityId },
  });

  revalidatePath("/", "layout");
}

export async function saveBlogPost(formData: FormData) {
  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const categoryId = formData.get("categoryId") as string;
  const published = formData.get("published") === "on";

  const data = {
    title,
    slug,
    content,
    excerpt,
    categoryId,
    published,
    publishedAt: published ? new Date() : null,
  };

  if (id) {
    await prisma.blogPost.update({ where: { id }, data });
  } else {
    await prisma.blogPost.create({ data });
  }

  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
}
