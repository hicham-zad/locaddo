import Script from "next/script";
import Link from "next/link";
import TimeFromNow from "@/components/TimeFromNow";

// ---------- SEO Metadata ----------
export const metadata = {
  title: "15 Minutes From Now – Exact Time | Locaddo",
  description:
    "What time is 15 minutes from now? Use this free time calculator to see the exact time in your timezone (and others). Copy/share the result instantly.",
  alternates: { canonical: "/tools/15-minutes-from-now" },
  openGraph: {
    title: "15 Minutes From Now – Exact Time",
    description:
      "Instantly calculate the exact time 15 minutes from now. Supports custom offsets and time zones.",
    url: "https://locaddo.com/tools/15-minutes-from-now",
    siteName: "Locaddo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "15 Minutes From Now – Exact Time",
    description:
      "Instantly calculate the exact time 15 minutes from now. Supports custom offsets and time zones.",
  },
};

// ---------- JSON-LD helpers ----------
function getFaqJsonLd() {
  const faqs = [
    {
      q: "What time is 15 minutes from now?",
      a: "This tool shows the exact clock time 15 minutes ahead based on your selected timezone and live current time.",
    },
    {
      q: "Can I change the offset?",
      a: "Yes. You can enter any minutes (e.g., 30, 45, 90) or pick a quick preset.",
    },
    {
      q: "Does it work with other time zones?",
      a: "Yes. Choose a time zone from the dropdown to view the result there.",
    },
    {
      q: "Does the page store my data?",
      a: "No. All calculations run in your browser and nothing is saved.",
    },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function getBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://locaddo.com/" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://locaddo.com/#tools" },
      { "@type": "ListItem", position: 3, name: "15 Minutes From Now", item: "https://locaddo.com/tools/15-minutes-from-now" },
    ],
  };
}

function getWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "15 Minutes From Now – Exact Time | Locaddo",
    url: "https://locaddo.com/tools/15-minutes-from-now",
    description:
      "See the exact time 15 minutes from now in your timezone. Supports custom offsets and multiple time zones.",
    isPartOf: { "@type": "WebSite", name: "Locaddo", url: "https://locaddo.com" },
  };
}

// ---------- Page ----------
export default function FifteenMinutesFromNowPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
      <Script id="ld-faq-15m" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }} />
      <Script id="ld-breadcrumb-15m" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd()) }} />
      <Script id="ld-webpage-15m" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageJsonLd()) }} />

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/#tools" className="hover:text-gray-900">Tools</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900">15 Minutes From Now</span>
          </div>
        </nav>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-lg mb-6">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                d="M12 6v6l4 2M12 22a10 10 0 100-20 10 10 0 000 20z" />
            </svg>
          </div>
          <h1 className="text-5xl font-semibold text-gray-900 mb-4 tracking-tight">15 Minutes From Now</h1>
          <p className="text-lg text-gray-600">Get the exact time 15 minutes ahead. Change minutes, pick a timezone, and copy/share the result.</p>
        </div>

        {/* Tool */}
        <div className="mb-20">
          <TimeFromNow defaultMinutes={15} />
        </div>

        {/* FAQ side card */}
        <div className="max-w-3xl mx-auto">
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong>What time is 15 minutes from now?</strong> The calculator shows it live for your chosen timezone.</li>
              <li><strong>Can I use other offsets?</strong> Yes—enter any number of minutes or tap a preset (30/45/60).</li>
              <li><strong>Can I view other time zones?</strong> Yes—select any IANA timezone (e.g., America/New_York).</li>
              <li><strong>Is data stored?</strong> No. Everything runs locally in your browser.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
