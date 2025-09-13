import React from "react";
import Script from "next/script";
import Link from "next/link";
import BMICalculator from "@/components/BMICalculator";


// ---------- SEO Metadata ----------
export const metadata = {
  title: "Free BMI Calculator (Metric & Imperial) | Locaddo",
  description:
    "Use Locaddo's free BMI Calculator to compute your Body Mass Index (BMI) in metric or imperial units. Get your category and a healthy weight range instantly.",
  alternates: {
    canonical: "/tools/bmi",
  },
  openGraph: {
    title: "Free BMI Calculator | Locaddo",
    description:
      "Compute BMI with metric or imperial units. Instantly see your category and healthy weight range.",
    url: "https://locaddo.com/tools/bmi",
    siteName: "Locaddo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free BMI Calculator | Locaddo",
    description:
      "Compute BMI with metric or imperial units. Instantly see your category and healthy weight range.",
  },
};

// ---------- Helper: JSON-LD builders ----------
function getFaqJsonLd() {
  const faqs = [
    {
      q: "What is BMI?",
      a: "Body Mass Index (BMI) estimates body fat using height and weight. It's a screening tool, not a diagnosis.",
    },
    {
      q: "What is the BMI formula?",
      a: "Metric: BMI = kg / (m²). Imperial: BMI = 703 × (lb / in²).",
    },
    {
      q: "What are the adult BMI categories?",
      a: "Underweight <18.5, Normal 18.5–24.9, Overweight 25–29.9, Obesity ≥30.",
    },
    {
      q: "Is BMI accurate for athletes?",
      a: "BMI may overestimate fat in very muscular people and underestimate in those with low muscle mass.",
    },
    {
      q: "What is a healthy weight range for my height?",
      a: "A healthy range corresponds to BMI 18.5–24.9. The calculator shows this range for your height.",
    },
    {
      q: "Should children use BMI the same way?",
      a: "No. Children's BMI uses age- and sex-specific percentiles and should be interpreted by a clinician.",
    },
    {
      q: "How often should I check my BMI?",
      a: "Occasional checks are enough. Track long-term trends along with waist size, activity, and nutrition.",
    },
    {
      q: "What's the difference between BMI and body fat percentage?",
      a: "BMI uses only height and weight. Body fat % estimates composition (fat vs. lean mass) and is more specific.",
    },
    {
      q: "Can I use metric and imperial units?",
      a: "Yes. The tool supports kg/cm and lb/ft+in and converts automatically.",
    },
    {
      q: "Does this tool store my data?",
      a: "No. All calculations run in your browser; Locaddo does not save your inputs.",
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://locaddo.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://locaddo.com/#tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "BMI Calculator",
        item: "https://locaddo.com/tools/bmi",
      },
    ],
  };
}

function getWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free BMI Calculator (Metric & Imperial) | Locaddo",
    url: "https://locaddo.com/tools/bmi",
    description:
      "Use Locaddo's free BMI Calculator to compute your Body Mass Index (BMI) in metric or imperial units. Get your category and a healthy weight range instantly.",
    isPartOf: { "@type": "WebSite", name: "Locaddo", url: "https://locaddo.com" },
  };
}

// ---------- Page ----------
export default function BMIPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD (FAQ + Breadcrumb + WebPage) */}
      <Script
        id="ld-faq-bmi"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
      />
      <Script
        id="ld-breadcrumb-bmi"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd()) }}
      />
      <Script
        id="ld-webpage-bmi"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageJsonLd()) }}
      />

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/#tools" className="hover:text-gray-900 transition-colors">
              Tools
            </Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">BMI Calculator</span>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-lg mb-6">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          
          <h1 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            BMI Calculator
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Calculate your Body Mass Index with precision. Get instant results with both metric and imperial units.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free to use
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              No data stored
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Instant results
            </div>
          </div>
        </div>

        {/* Calculator */}
        <div className="mb-20">
          <BMICalculator />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-12">
              {/* Understanding BMI */}
              <section>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                  Understanding BMI
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    Body Mass Index is a screening tool that estimates body fat based on height and weight. 
                    While widely used in healthcare, it's best understood as one of several health indicators 
                    rather than a definitive measure of health or fitness.
                  </p>
                </div>

                {/* Formulas */}
                <div className="grid sm:grid-cols-2 gap-6 mt-8">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center">
                        M
                      </div>
                      <h3 className="font-medium text-gray-900">Metric Formula</h3>
                    </div>
                    <div className="font-mono text-lg text-gray-900 mb-2">
                      BMI = kg / m²
                    </div>
                    <p className="text-sm text-gray-600">
                      Weight in kilograms divided by height in meters squared
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center">
                        I
                      </div>
                      <h3 className="font-medium text-gray-900">Imperial Formula</h3>
                    </div>
                    <div className="font-mono text-lg text-gray-900 mb-2">
                      BMI = 703 × (lb / in²)
                    </div>
                    <p className="text-sm text-gray-600">
                      703 times weight in pounds divided by height in inches squared
                    </p>
                  </div>
                </div>
              </section>

              {/* BMI Categories */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  BMI Categories
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-4 px-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                      <span className="font-medium text-gray-900">Underweight</span>
                    </div>
                    <span className="text-sm text-gray-600">Below 18.5</span>
                  </div>
                  <div className="flex items-center justify-between py-4 px-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                      <span className="font-medium text-gray-900">Normal weight</span>
                    </div>
                    <span className="text-sm text-gray-600">18.5 – 24.9</span>
                  </div>
                  <div className="flex items-center justify-between py-4 px-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-cyan-600 rounded-full"></div>
                      <span className="font-medium text-gray-900">Overweight</span>
                    </div>
                    <span className="text-sm text-gray-600">25.0 – 29.9</span>
                  </div>
                  <div className="flex items-center justify-between py-4 px-6 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-cyan-700 rounded-full"></div>
                      <span className="font-medium text-gray-900">Obesity</span>
                    </div>
                    <span className="text-sm text-gray-600">30.0 and above</span>
                  </div>
                </div>
              </section>

              {/* Important Note */}
              <section className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex gap-4">
                  <svg className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Important Considerations</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      BMI doesn't distinguish between muscle and fat mass, and may not accurately reflect 
                      health for athletes, elderly individuals, or those with unique body compositions. 
                      Consult healthcare professionals for comprehensive health assessment.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar - FAQ */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {getFaqJsonLd().mainEntity.slice(0, 6).map((faq, index) => (
                  <details key={index} className="group border border-gray-200 rounded-lg">
                    <summary className="flex cursor-pointer list-none items-center justify-between p-4 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                      <span>{faq.name}</span>
                      <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.acceptedAnswer.text}
                      </p>
                    </div>
                  </details>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 p-6 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Explore More Tools</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Discover our collection of health and fitness calculators.
                </p>
                <Link 
                  href="/#tools" 
                  className="inline-flex items-center text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                  View all tools
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}