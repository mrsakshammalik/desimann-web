import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { PRODUCTS, SITE_CONFIG } from "@/lib/constants";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Authentic Homemade Food | Desimann`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream text-dark-brown pt-16">
      {/* JSON-LD Product Schema */}
      <SchemaMarkup
        type="Product"
        data={{
          name: product.name,
          image: `${SITE_CONFIG.url}${product.image}`,
          description: product.description,
          sku: product.id,
          brand: {
            "@type": "Brand",
            name: SITE_CONFIG.name,
          },
          offers: {
            "@type": "Offer",
            url: `${SITE_CONFIG.url}/products/${product.id}`,
            priceCurrency: "INR",
            price: product.price,
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/PreOrder",
          },
        }}
      />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-warm-gray hover:text-mustard transition-colors font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-white/50 border border-warm-gray/10 shadow-xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Details */}
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4" style={{ backgroundColor: `${product.color}20`, color: product.color }}>
              {product.shelfLife} Shelf Life
            </div>
            
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold mb-4 leading-tight text-rich-black">
              {product.name}
            </h1>
            
            <p className="text-xl text-warm-gray mb-8">
              {product.tagline}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-dark-brown">₹{product.price}</span>
              <span className="text-xl text-warm-gray line-through">₹{product.originalPrice}</span>
            </div>

            <p className="text-lg leading-relaxed text-warm-gray mb-10">
              {product.description}
            </p>

            <Link
              href="/#reserve"
              className="inline-flex justify-center items-center w-full bg-mustard text-rich-black font-bold text-lg px-8 py-4 rounded-full shadow-lg shadow-mustard/20 hover:shadow-mustard/40 hover:scale-[1.02] transition-all cursor-pointer"
            >
              Pre-Order Now
            </Link>

            {/* Ingredients */}
            <div className="mt-12 pt-12 border-t border-warm-gray/20">
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-6">Authentic Ingredients</h3>
              <div className="flex flex-wrap gap-3">
                {product.ingredients.map((ing) => (
                  <span key={ing} className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-warm-gray/20 text-sm font-medium text-dark-brown shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-mustard" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
