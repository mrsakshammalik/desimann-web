import { notFound } from "next/navigation";
import { LEGAL_PAGES } from "../content";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(LEGAL_PAGES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const page = LEGAL_PAGES[resolvedParams.slug];
  
  if (!page) {
    return { title: "Page Not Found" };
  }

  return {
    title: `${page.title} | Desimann`,
    description: `Read the ${page.title.toLowerCase()} for Desimann.`,
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const page = LEGAL_PAGES[resolvedParams.slug];

  if (!page) {
    notFound();
  }

  return (
    <article className="prose prose-stone prose-lg max-w-none">
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-dark-brown mb-8 pb-4 border-b border-warm-gray/20">
        {page.title}
      </h1>
      <div className="whitespace-pre-wrap text-warm-gray leading-relaxed text-base md:text-lg">
        {page.content}
      </div>
    </article>
  );
}
