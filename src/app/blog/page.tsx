import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowRight, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Desimann Blog | Recipes, Stories & Health",
  description: "Explore traditional Indian recipes, the health benefits of authentic spices, and stories straight from our farmers.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.blogCategory.findMany({
    include: {
      _count: {
        select: { posts: { where: { published: true } } },
      },
    },
  });

  return (
    <div className="min-h-screen bg-cream text-dark-brown pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold mb-6 text-rich-black">
            The Desimann Journal
          </h1>
          <p className="text-lg md:text-xl text-warm-gray">
            Stories, recipes, and traditions from the heart of India.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <Link 
            href="/blog"
            className="px-5 py-2 rounded-full bg-mustard text-rich-black font-semibold text-sm shadow-md"
          >
            All Posts
          </Link>
          {categories.map((cat) => (
            cat._count.posts > 0 && (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className="px-5 py-2 rounded-full bg-white border border-warm-gray/20 text-warm-gray hover:border-mustard hover:text-dark-brown transition-colors text-sm font-medium"
              >
                {cat.name} <span className="opacity-50 ml-1">({cat._count.posts})</span>
              </Link>
            )
          ))}
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-warm-gray/10">
            <h3 className="text-xl font-medium text-warm-gray mb-2">No posts yet</h3>
            <p className="text-warm-gray/70">Check back soon for new articles and recipes!</p>
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
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-dark-brown">
                    {post.category.name}
                  </div>
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
