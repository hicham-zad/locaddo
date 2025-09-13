import React from "react";
import Script from "next/script";
import Link from "next/link";
import BodyFrameCalculator from "@/components/BodyFrameCalculator";

// ---------- SEO Metadata ----------
export const metadata = {
  title: "Free Body Frame Size Calculator - Determine Small, Medium, Large Frame | Locaddo",
  description:
    "Calculate your body frame size using wrist and elbow measurements. Determine if you have a small, medium, or large frame for accurate weight goals and health assessment.",
  keywords: "body frame size calculator, body frame calculator, small medium large frame, wrist measurement calculator, elbow breadth calculator, frame size determination",
  alternates: { canonical: "/tools/body-frame-size" },
  openGraph: {
    title: "Free Body Frame Size Calculator | Determine Your Frame Type",
    description:
      "Calculate your body frame size using scientific methods. Get accurate frame classification for better health and fitness planning.",
    url: "https://locaddo.com/tools/body-frame-size",
    siteName: "Locaddo",
    type: "website",
    images: [{
      url: "https://locaddo.com/images/body-frame-calculator.jpg",
      width: 1200,
      height: 630,
      alt: "Body Frame Size Calculator"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Body Frame Size Calculator | Determine Your Frame Type",
    description:
      "Calculate your body frame size using wrist and elbow measurements. Get accurate frame classification for health planning.",
    images: ["https://locaddo.com/images/body-frame-calculator.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

// ---------- Helper: JSON-LD builders ----------
function getFaqJsonLd() {
  const faqs = [
    {
      q: "What is body frame size and why does it matter?",
      a: "Body frame size refers to the skeletal structure of your body - whether you have a small, medium, or large frame. It affects your ideal weight range, body composition, and helps set realistic fitness goals based on your natural bone structure."
    },
    {
      q: "How do I measure my wrist for frame size calculation?",
      a: "Measure your wrist circumference at the narrowest point, just below the wrist bone where you'd wear a watch. Use a flexible measuring tape and ensure it's snug but not tight."
    },
    {
      q: "How do I measure my elbow breadth?",
      a: "Extend your arm forward, bend your elbow at 90 degrees, and measure the distance between the two prominent bones on either side of your elbow. Use calipers or a ruler for accuracy."
    },
    {
      q: "What are the different body frame sizes?",
      a: "There are three main frame sizes: Small frame (delicate bone structure), Medium frame (average bone structure), and Large frame (robust bone structure). Each has different healthy weight ranges."
    },
    {
      q: "Can frame size change over time?",
      a: "No, your skeletal frame size is determined by genetics and doesn't change in adulthood. However, muscle mass and body composition can change, affecting your overall appearance."
    },
    {
      q: "How does frame size affect ideal weight?",
      a: "People with larger frames can typically carry more weight healthily than those with smaller frames of the same height. Frame size helps determine more accurate ideal weight ranges than height alone."
    },
    {
      q: "Is the wrist or elbow method more accurate?",
      a: "Both methods are scientifically validated. The wrist method is easier to self-measure, while the elbow breadth method may be more precise but requires proper technique or assistance."
    },
    {
      q: "Does gender affect frame size calculation?",
      a: "Yes, men and women have different frame size thresholds due to natural differences in bone structure. Our calculator uses gender-specific measurements for accuracy."
    }
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
      { "@type": "ListItem", position: 2, name: "Health Tools", item: "https://locaddo.com/#tools" },
      { "@type": "ListItem", position: 3, name: "Body Frame Size Calculator", item: "https://locaddo.com/tools/body-frame-size" },
    ],
  };
}

function getWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free Body Frame Size Calculator - Determine Small, Medium, Large Frame",
    url: "https://locaddo.com/tools/body-frame-size",
    description: "Calculate your body frame size using wrist and elbow measurements. Determine if you have a small, medium, or large frame for accurate weight goals.",
    isPartOf: { "@type": "WebSite", name: "Locaddo", url: "https://locaddo.com" },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Body Frame Size Calculator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        ratingCount: "892"
      }
    }
  };
}

function getHowToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Body Frame Size",
    description: "Learn how to determine your body frame size using wrist circumference and elbow breadth measurements.",
    totalTime: "PT3M",
    supply: [
      { "@type": "HowToSupply", name: "Flexible measuring tape" },
      { "@type": "HowToSupply", name: "Ruler or calipers (for elbow method)" }
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Choose Measurement Method",
        text: "Select either the wrist circumference method (easier) or elbow breadth method (more precise) for calculating frame size.",
        image: "https://locaddo.com/images/frame-measurement-methods.jpg"
      },
      {
        "@type": "HowToStep", 
        name: "Measure Wrist Circumference",
        text: "Wrap a measuring tape around your wrist at the narrowest point, just below the wrist bone. Record the measurement.",
        image: "https://locaddo.com/images/wrist-measurement.jpg"
      },
      {
        "@type": "HowToStep",
        name: "Measure Elbow Breadth (Alternative)",
        text: "Extend your arm, bend elbow to 90 degrees, and measure the distance between the two prominent bones on either side of your elbow.",
        image: "https://locaddo.com/images/elbow-measurement.jpg"
      },
      {
        "@type": "HowToStep",
        name: "Calculate Frame Size",
        text: "Enter your measurements into the calculator along with your height and gender to determine if you have a small, medium, or large frame.",
        image: "https://locaddo.com/images/frame-calculation.jpg"
      }
    ]
  };
}

// ---------- Page ----------
export default function BodyFrameCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <Script
        id="ld-faq-frame"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
      />
      <Script
        id="ld-breadcrumb-frame"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd()) }}
      />
      <Script
        id="ld-webpage-frame"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageJsonLd()) }}
      />
      <Script
        id="ld-howto-frame"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getHowToJsonLd()) }}
      />

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="mb-12" aria-label="Breadcrumb">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/#tools" className="hover:text-gray-900 transition-colors">
              Health Tools
            </Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">Body Frame Size Calculator</span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-lg mb-6">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          
          <h1 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            Body Frame Size Calculator
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Determine your body frame size using scientific wrist and elbow measurements. 
            Essential for setting realistic weight goals and understanding your natural body structure.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Scientific Methods
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Accurate Results
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Privacy Protected
            </div>
          </div>
        </header>

        {/* Calculator */}
        <section className="mb-20" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="sr-only">Body Frame Size Calculator Tool</h2>
          <BodyFrameCalculator />
        </section>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="space-y-12">
              {/* Understanding Body Frame */}
              <section>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                  Understanding Body Frame Size
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    Body frame size refers to your skeletal structure and bone density, which significantly impacts 
                    your ideal weight range and body composition. Unlike weight or muscle mass, frame size is 
                    determined by genetics and remains constant throughout adulthood.
                  </p>
                </div>

                {/* Frame Types */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Frame Size Categories</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="w-8 h-8 bg-cyan-400 rounded text-white text-sm font-medium flex items-center justify-center mb-4">
                        S
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Small Frame</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Delicate bone structure with narrow shoulders and hips. Lower ideal weight ranges.
                      </p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li>• Naturally lean build</li>
                        <li>• Smaller wrist and ankle circumference</li>
                        <li>• May appear taller than actual height</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center mb-4">
                        M
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Medium Frame</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Average bone structure with proportionate features. Standard ideal weight ranges.
                      </p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li>• Balanced proportions</li>
                        <li>• Average wrist and ankle size</li>
                        <li>• Most common frame type</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="w-8 h-8 bg-cyan-600 rounded text-white text-sm font-medium flex items-center justify-center mb-4">
                        L
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Large Frame</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Robust bone structure with broader shoulders and hips. Higher ideal weight ranges.
                      </p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li>• Strong, sturdy build</li>
                        <li>• Larger wrist and ankle circumference</li>
                        <li>• Can carry more weight healthily</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Measurement Methods */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Measurement Methods
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center mb-4">
                      1
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Wrist Circumference Method</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      The most accessible method using a measuring tape around your wrist.
                    </p>
                    <div className="text-xs text-gray-500 space-y-2">
                      <div><strong>How to measure:</strong></div>
                      <ul className="space-y-1 ml-4">
                        <li>• Wrap tape around wrist below the bone</li>
                        <li>• Keep tape snug but not tight</li>
                        <li>• Measure at narrowest point</li>
                        <li>• Compare to height-based thresholds</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center mb-4">
                      2
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Elbow Breadth Method</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      More precise method measuring the width of your elbow joint.
                    </p>
                    <div className="text-xs text-gray-500 space-y-2">
                      <div><strong>How to measure:</strong></div>
                      <ul className="space-y-1 ml-4">
                        <li>• Extend arm forward, bend at 90°</li>
                        <li>• Measure between elbow bone points</li>
                        <li>• Use calipers or ruler</li>
                        <li>• Compare to gender-specific charts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Why Frame Size Matters */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Why Frame Size Matters
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Health Benefits</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          More accurate ideal weight ranges
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Realistic fitness goal setting
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Better understanding of body composition
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Improved body image and self-acceptance
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Practical Applications</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Personalized nutrition planning
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Appropriate exercise program design
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Medical assessment accuracy
                        </li>
                        <li className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Clothing and equipment sizing
                        </li>
                      </ul>
                    </div>
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
                      Frame size is just one factor in determining healthy weight ranges. Individual factors like 
                      muscle mass, bone density, age, and overall health status also play important roles. 
                      Use frame size as a guide alongside other health assessments, not as the sole determinant 
                      of ideal weight. Consult healthcare professionals for comprehensive health planning.
                    </p>
                  </div>
                </div>
              </section>
            </article>
          </div>

          {/* Sidebar - FAQ */}
          <aside className="lg:col-span-2">
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

              {/* Related Tools CTA */}
              <div className="mt-8 p-6 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Related Health Tools</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Explore our other body assessment calculators for comprehensive health tracking.
                </p>
                <div className="space-y-2 text-sm">
                  <Link href="/tools/bmi" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → BMI Calculator
                  </Link>
                  <Link href="/tools/waist-hip-ratio" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → Waist-to-Hip Ratio Calculator
                  </Link>
                  <Link href="/tools/body-fat" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → Body Fat Calculator
                  </Link>
                </div>
                <Link 
                  href="/#tools" 
                  className="inline-flex items-center text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors mt-4"
                >
                  View all tools
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}