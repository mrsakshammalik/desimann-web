import Script from "next/script";

type SchemaType = "Organization" | "LocalBusiness" | "Product" | "Article" | "FAQPage" | "BreadcrumbList";

interface SchemaMarkupProps {
  type: SchemaType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <Script
      id={`schema-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Preset Organization Schema
export function OrganizationSchema({ name, url, logo, sameAs }: { name: string, url: string, logo: string, sameAs: string[] }) {
  return (
    <SchemaMarkup 
      type="Organization" 
      data={{
        name,
        url,
        logo,
        sameAs
      }} 
    />
  );
}
