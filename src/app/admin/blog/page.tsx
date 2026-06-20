import prisma from "@/lib/prisma";
import { saveBlogPost } from "@/app/actions/admin";
import { Save, PlusCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.blogCategory.findMany();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-dark-brown">
            Blog Management
          </h1>
          <p className="text-warm-gray text-sm">Write, edit, and publish blog articles.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-dark-brown mb-4">Create New Post</h2>
        <form action={saveBlogPost} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-warm-gray mb-1.5 uppercase tracking-wider">
                Title
              </label>
              <input
                name="title"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all text-sm text-dark-brown"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-warm-gray mb-1.5 uppercase tracking-wider">
                URL Slug
              </label>
              <input
                name="slug"
                required
                placeholder="my-new-post"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all text-sm text-dark-brown font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-gray mb-1.5 uppercase tracking-wider">
              Category
            </label>
            <select
              name="categoryId"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all text-sm text-dark-brown"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-gray mb-1.5 uppercase tracking-wider">
              Excerpt (Short Description)
            </label>
            <textarea
              name="excerpt"
              rows={2}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all text-sm text-dark-brown"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-warm-gray mb-1.5 uppercase tracking-wider">
              Content (Markdown)
            </label>
            <textarea
              name="content"
              required
              rows={12}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all text-sm text-dark-brown font-mono leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="published" id="published" className="w-4 h-4 text-mustard border-gray-300 rounded focus:ring-mustard" />
            <label htmlFor="published" className="text-sm text-dark-brown font-medium">Publish immediately</label>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-dark-brown text-cream px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-dark-brown/90 transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Create Post
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Post Title</th>
              <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-dark-brown">{post.title}</td>
                <td className="px-6 py-4 text-warm-gray">{post.category.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-warm-gray">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-warm-gray">No posts found. Create one above!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
