import prisma from "@/lib/prisma";
import { updateSeoSettings, updateAnalyticsSettings } from "@/app/actions/admin";
import { Save } from "lucide-react";

export default async function AdminSeoPage() {
  const seo = await prisma.seoMetadata.findUnique({ where: { id: "global" } });
  const tracking = await prisma.analyticsTracking.findUnique({ where: { id: "singleton" } });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-dark-brown">
          SEO & Analytics Management
        </h1>
        <p className="text-warm-gray text-sm">Configure global metadata and tracking pixels.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Global SEO Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-dark-brown mb-4">Global Meta Tags</h2>
          <form action={updateSeoSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-warm-gray mb-1.5 uppercase tracking-wider">
                Meta Title
              </label>
              <input
                name="metaTitle"
                defaultValue={seo?.metaTitle || "Desimann — Dil Se Desi, Swad Mein Asli"}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all text-sm text-dark-brown"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-warm-gray mb-1.5 uppercase tracking-wider">
                Meta Description
              </label>
              <textarea
                name="metaDescription"
                rows={3}
                defaultValue={seo?.metaDescription || "India's most trusted homemade food brand."}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all text-sm text-dark-brown"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-warm-gray mb-1.5 uppercase tracking-wider">
                Keywords (Comma Separated)
              </label>
              <input
                name="keywords"
                defaultValue={seo?.keywords || ""}
                placeholder="homemade pickles, mustard oil, authentic indian food"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all text-sm text-dark-brown"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-dark-brown text-cream px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-dark-brown/90 transition-colors"
            >
              <Save className="w-4 h-4" /> Save SEO Settings
            </button>
          </form>
        </div>

        {/* Analytics Tracking */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-dark-brown mb-4">Analytics & Tracking</h2>
          <form action={updateAnalyticsSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-warm-gray mb-1.5 uppercase tracking-wider">
                Google Analytics 4 ID
              </label>
              <input
                name="ga4Id"
                placeholder="G-XXXXXXXXXX"
                defaultValue={tracking?.ga4Id || ""}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all text-sm text-dark-brown font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-warm-gray mb-1.5 uppercase tracking-wider">
                Meta/Facebook Pixel ID
              </label>
              <input
                name="metaPixelId"
                placeholder="XXXXXXXXXXXXXXXX"
                defaultValue={tracking?.metaPixelId || ""}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all text-sm text-dark-brown font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-warm-gray mb-1.5 uppercase tracking-wider">
                Microsoft Clarity ID
              </label>
              <input
                name="clarityId"
                placeholder="xxxxxxx"
                defaultValue={tracking?.clarityId || ""}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all text-sm text-dark-brown font-mono"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-dark-brown text-cream px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-dark-brown/90 transition-colors"
            >
              <Save className="w-4 h-4" /> Save Tracking IDs
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
