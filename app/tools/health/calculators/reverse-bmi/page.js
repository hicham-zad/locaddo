import React from "react";
import Script from "next/script";
import Link from "next/link";
import ReverseBMICalculator from "../../../../components/ReverseBMICalculator.jsx";

// ---------- SEO Metadata ----------
export const metadata = {
  title: "Reverse BMI Calculator (Target Weight by Height) | Locaddo",
  description:
    "Enter your height and a target BMI to instantly see the weight you need to reach it. Supports metric (kg/cm) and imperial (lb/ft+in). Free, fast, and private.",
  alternates: { canonical: "/tools/reverse-bmi" },
  openGraph: {
    title: "Reverse BMI Calculator | Locaddo",
    description:
      "Find the target weight for a specific BMI from your height. Metric & imperial units.",
    url: "https://locaddo.com/tools/reverse-bmi",
    siteName: "Locaddo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reverse BMI Calculator | Locaddo",
    description:
      "Find target weight for a specific BMI using your height. Metric & imperial.",
  },
};

// ---------- Helper: JSON-LD builders ----------
function getFaqJsonLd() {
  const faqs = [
    {
      q: "What does a Reverse BMI Calculator do?",
      a: "It calculates the target weight you need to reach a chosen BMI using your height.",
    },
    {
      q: "What formula does it use?",
      a: "Required weight (kg) = Target BMI × height(m)². For imperial results, kilograms are converted to pounds.",
    },
    {
      q: "Which units can I use?",
      a: "Metric (kg/cm) and Imperial (lb/ft+in). The tool converts automatically.",
    },
    {
      q: "What BMI should I target?",
      a: "Many adults aim for a BMI within 18.5–24.9, but the right target depends on individual factors. Consult a healthcare professional.",
    },
    {
      q: "Does the calculator store any data?",
      a: "No. All calculations run locally in your browser and are not saved.",
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
      { "@type": "ListItem", position: 3, name: "Reverse BMI Calculator", item: "https://locaddo.com/tools/reverse-bmi" },
    ],
  };
}

function getWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Reverse BMI Calculator (Target Weight by Height) | Locaddo",
    url: "https://locaddo.com/tools/reverse-bmi",
    description:
      "Enter your height and a target BMI to instantly see the weight you need to reach it. Supports metric (kg/cm) and imperial (lb/ft+in).",
    isPartOf: { "@type": "WebSite", name: "Locaddo", url: "https://locaddo.com" },
  };
}

// ---------- Page ----------
export default function ReverseBMIPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
      <Script
        id="ld-faq-reverse-bmi"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
      />
      <Script
        id="ld-breadcrumb-reverse-bmi"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd()) }}
      />
      <Script
        id="ld-webpage-reverse-bmi"
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
            <span className="text-gray-900">Reverse BMI Calculator</span>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-lg mb-6">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" />
            </svg>
          </div>
          
          <h1 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            Reverse BMI Calculator
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Find the target weight needed to reach a specific BMI based on your height.
            Perfect for setting health and fitness goals.
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
          <ReverseBMICalculator />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-12">
              {/* How it works */}
              <section>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                  How Reverse BMI Works
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    Instead of calculating BMI from your current weight and height, reverse BMI calculation 
                    determines the weight you need to reach a specific BMI target. This is particularly 
                    useful for goal setting and health planning.
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
                      Weight = BMI × height²
                    </div>
                    <p className="text-sm text-gray-600">
                      Target BMI multiplied by height in meters squared
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center">
                        I
                      </div>
                      <h3 className="font-medium text-gray-900">Imperial Conversion</h3>
                    </div>
                    <div className="font-mono text-lg text-gray-900 mb-2">
                      Weight(lb) = Weight(kg) ÷ 0.454
                    </div>
                    <p className="text-sm text-gray-600">
                      Result converted from kilograms to pounds
                    </p>
                  </div>
                </div>
              </section>

              {/* Steps */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  How to Use
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center mb-4">
                      1
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Enter your height</h4>
                    <p className="text-sm text-gray-600">
                      Use centimeters for metric or feet and inches for imperial units.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center mb-4">
                      2
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Set your target BMI</h4>
                    <p className="text-sm text-gray-600">
                      Choose a BMI value you want to achieve (typically 18.5-24.9 for adults).
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center mb-4">
                      3
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Get your target weight</h4>
                    <p className="text-sm text-gray-600">
                      See the exact weight needed to reach your BMI goal.
                    </p>
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
                      This calculator is a planning tool and should not replace professional medical advice. 
                      BMI doesn't account for muscle mass, bone density, or individual body composition. 
                      Consult healthcare professionals when setting weight goals.
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
                {getFaqJsonLd().mainEntity.map((faq, index) => (
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
                <h3 className="font-medium text-gray-900 mb-2">More Health Tools</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Explore our collection of health and fitness calculators.
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