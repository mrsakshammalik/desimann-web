import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, User } from "lucide-react";
import prisma from "@/lib/prisma";
import { SITE_CONFIG } from "@/lib/constants";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug: resolvedParams.slug, published: true },
  });

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metaTitle || `${post.title} | Desimann Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.coverImage ? [post.coverImage] : [],
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug: resolvedParams.slug, published: true },
    include: { category: true },
  });

  if (!post) {
    notFound();
  }

  const publishedDate = post.publishedAt || post.createdAt;

  return (
    <article className="min-h-screen bg-cream text-dark-brown pt-16">
      <SchemaMarkup
        type="Article"
        data={{
          headline: post.title,
          image: post.coverImage ? [`${SITE_CONFIG.url}${post.coverImage}`] : [],
          datePublished: publishedDate.toISOString(),
          dateModified: post.updatedAt.toISOString(),
          author: [{
            "@type": "Person",
            name: post.author,
          }],
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-warm-gray hover:text-mustard transition-colors font-medium mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm font-bold text-mustard uppercase tracking-widest mb-6">
            <Link href={`/blog/category/${post.category.slug}`} className="hover:underline">
              {post.category.name}
            </Link>
          </div>
          
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-rich-black">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-warm-gray mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-6 text-warm-gray/60 text-sm font-medium border-t border-b border-warm-gray/10 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {publishedDate.toLocaleDateString("en-IN", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-warm-gray/10 mb-16 shadow-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* Markdown Content */}
        <div className="prose prose-stone prose-lg md:prose-xl max-w-none prose-headings:font-[family-name:var(--font-playfair)] prose-a:text-mustard hover:prose-a:text-dark-brown prose-img:rounded-2xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="mt-16 pt-8 border-t border-warm-gray/10">
            <div className="flex flex-wrap gap-2">
              {post.tags.split(",").map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white border border-warm-gray/20 rounded-full text-xs font-medium text-warm-gray">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
