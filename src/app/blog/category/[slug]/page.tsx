import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = await prisma.blogCategory.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Articles | Desimann Blog`,
    description: `Read the latest articles about ${category.name.toLowerCase()} from Desimann.`,
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = await prisma.blogCategory.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      posts: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) {
    notFound();
  }

  const posts = category.posts;

  return (
    <div className="min-h-screen bg-cream text-dark-brown pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-warm-gray hover:text-mustard transition-colors font-medium mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Categories
        </Link>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-mustard/10 text-mustard text-xs font-bold tracking-widest uppercase mb-4">
            Category
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold mb-6 text-rich-black">
            {category.name}
          </h1>
          <p className="text-lg text-warm-gray">
            {posts.length} {posts.length === 1 ? "Article" : "Articles"}
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-warm-gray/10">
            <h3 className="text-xl font-medium text-warm-gray mb-2">No posts yet</h3>
            <p className="text-warm-gray/70">We are still writing articles for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.id}
                className="group bg-white rounded-3xl overflow-hidden border border-warm-gray/10 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
              >
                {/* Image Placeholder if no cover */}
                <div className="aspect-video bg-warm-gray/10 relative overflow-hidden">
                  {post.coverImage ? (
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-warm-gray/30 font-[family-name:var(--font-playfair)] text-2xl font-bold bg-gradient-to-br from-warm-gray/5 to-mustard/10">
                      Desimann
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-warm-gray/60 text-xs font-medium mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-3 text-rich-black group-hover:text-mustard transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-warm-gray text-sm line-clamp-3 mb-6 flex-1">
                    {post.excerpt || post.content.substring(0, 120) + "..."}
                  </p>
                  <div className="flex items-center gap-2 text-mustard font-bold text-sm group-hover:gap-3 transition-all mt-auto">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
