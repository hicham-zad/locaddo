export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Locaddo",
    "url": "https://locaddo.com",
    "logo": "https://locaddo.com/logo.png",
    "description": "AI-powered platform that transforms local news into SEO-optimized blog content"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}