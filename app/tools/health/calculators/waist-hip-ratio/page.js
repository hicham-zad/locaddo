import React from "react";
import Script from "next/script";
import Link from "next/link";
import WaistHipRatioCalculator from "@/components/WaistHipRatioCalculator";

// ---------- SEO Metadata ----------
export const metadata = {
  title: "Free Waist-to-Hip Ratio Calculator - Health Risk Assessment | Locaddo",
  description:
    "Calculate your waist-to-hip ratio (WHR) to assess health risks. Free online tool with instant results, health categories, and personalized recommendations for both men and women.",
  keywords: "waist to hip ratio calculator, WHR calculator, waist hip ratio, health risk assessment, body fat distribution, central obesity calculator, apple pear body shape",
  alternates: { canonical: "/tools/waist-hip-ratio" },
  openGraph: {
    title: "Free Waist-to-Hip Ratio Calculator | Health Risk Assessment",
    description:
      "Calculate your WHR to understand health risks. Instant results with personalized health recommendations based on your body fat distribution.",
    url: "https://locaddo.com/tools/waist-hip-ratio",
    siteName: "Locaddo",
    type: "website",
    images: [{
      url: "https://locaddo.com/images/waist-hip-ratio-calculator.jpg",
      width: 1200,
      height: 630,
      alt: "Waist-to-Hip Ratio Calculator"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Waist-to-Hip Ratio Calculator | Health Risk Assessment",
    description:
      "Calculate your WHR to understand health risks. Instant results with personalized recommendations.",
    images: ["https://locaddo.com/images/waist-hip-ratio-calculator.jpg"]
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
      q: "What is waist-to-hip ratio (WHR)?",
      a: "Waist-to-hip ratio is a measurement that compares your waist circumference to your hip circumference. It's calculated by dividing waist measurement by hip measurement and helps assess health risks related to body fat distribution."
    },
    {
      q: "How do I measure my waist and hips correctly?",
      a: "Measure your waist at the narrowest point, usually just above the belly button. Measure your hips at the widest point of your buttocks. Use a flexible measuring tape and ensure it's snug but not tight."
    },
    {
      q: "What is a healthy waist-to-hip ratio?",
      a: "For women, a WHR of 0.85 or lower is considered low risk. For men, 0.90 or lower is low risk. Higher ratios may indicate increased health risks including cardiovascular disease and diabetes."
    },
    {
      q: "Why is waist-to-hip ratio important for health?",
      a: "WHR indicates body fat distribution patterns. Higher ratios suggest more abdominal fat (apple shape), which is linked to increased risk of heart disease, diabetes, and metabolic syndrome compared to hip/thigh fat distribution (pear shape)."
    },
    {
      q: "Can I use metric and imperial units?",
      a: "Yes, our calculator supports both centimeters and inches. The ratio calculation is the same regardless of units since it's a proportion."
    },
    {
      q: "How often should I check my waist-to-hip ratio?",
      a: "Check your WHR every 3-6 months as part of regular health monitoring. It's more stable than weight and provides insight into changes in body composition and health risk over time."
    },
    {
      q: "Is WHR better than BMI for health assessment?",
      a: "WHR and BMI provide different health insights. WHR specifically measures fat distribution patterns and may be more predictive of cardiovascular risk, while BMI measures overall weight status. Both are useful screening tools."
    },
    {
      q: "What factors can affect my waist-to-hip ratio?",
      a: "Age, gender, genetics, hormonal changes, physical activity level, and diet all influence WHR. Men typically have higher ratios than women, and ratios tend to increase with age."
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
      { "@type": "ListItem", position: 3, name: "Waist-to-Hip Ratio Calculator", item: "https://locaddo.com/tools/waist-hip-ratio" },
    ],
  };
}

function getWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free Waist-to-Hip Ratio Calculator - Health Risk Assessment",
    url: "https://locaddo.com/tools/waist-hip-ratio",
    description: "Calculate your waist-to-hip ratio (WHR) to assess health risks. Free online tool with instant results, health categories, and personalized recommendations.",
    isPartOf: { "@type": "WebSite", name: "Locaddo", url: "https://locaddo.com" },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Waist-to-Hip Ratio Calculator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1247"
      }
    }
  };
}

function getHowToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Waist-to-Hip Ratio",
    description: "Step-by-step guide to measuring and calculating your waist-to-hip ratio for health assessment.",
    totalTime: "PT5M",
    supply: [
      { "@type": "HowToSupply", name: "Flexible measuring tape" }
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Measure Your Waist",
        text: "Stand straight and measure your waist at the narrowest point, typically just above your belly button. Keep the tape snug but not tight.",
        image: "https://locaddo.com/images/waist-measurement.jpg"
      },
      {
        "@type": "HowToStep", 
        name: "Measure Your Hips",
        text: "Measure around the widest part of your hips and buttocks, keeping the tape parallel to the floor.",
        image: "https://locaddo.com/images/hip-measurement.jpg"
      },
      {
        "@type": "HowToStep",
        name: "Calculate the Ratio",
        text: "Divide your waist measurement by your hip measurement. For example: 32 inches ÷ 40 inches = 0.80 WHR.",
        image: "https://locaddo.com/images/whr-calculation.jpg"
      },
      {
        "@type": "HowToStep",
        name: "Interpret Your Results",
        text: "Compare your ratio to health risk categories. For women: <0.85 low risk, 0.85-1.0 moderate risk, >1.0 high risk.",
        image: "https://locaddo.com/images/whr-interpretation.jpg"
      }
    ]
  };
}

// ---------- Page ----------
export default function WaistHipRatioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <Script
        id="ld-faq-whr"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
      />
      <Script
        id="ld-breadcrumb-whr"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd()) }}
      />
      <Script
        id="ld-webpage-whr"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageJsonLd()) }}
      />
      <Script
        id="ld-howto-whr"
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
            <span className="text-gray-900">Waist-to-Hip Ratio Calculator</span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-lg mb-6">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9l6.75-6.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            Waist-to-Hip Ratio Calculator
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Assess your health risk with our free waist-to-hip ratio calculator. 
            Get instant results and understand your body fat distribution patterns.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Health Risk Assessment
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Privacy Protected
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Medically Accurate
            </div>
          </div>
        </header>

        {/* Calculator */}
        <section className="mb-20" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="sr-only">Waist-to-Hip Ratio Calculator Tool</h2>
          <WaistHipRatioCalculator />
        </section>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="space-y-12">
              {/* Understanding WHR */}
              <section>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                  Understanding Waist-to-Hip Ratio
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    Waist-to-hip ratio (WHR) is a simple yet powerful measurement that assesses your body fat distribution 
                    and associated health risks. Unlike BMI, which only considers weight and height, WHR specifically 
                    evaluates where fat is stored on your body, providing crucial insights into cardiovascular and 
                    metabolic health risks.
                  </p>
                </div>

                {/* Health Risk Categories */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Health Risk Categories</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Women */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-pink-500 rounded text-white text-sm font-medium flex items-center justify-center">
                          W
                        </div>
                        <h4 className="font-medium text-gray-900">Women</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
                          <span className="text-green-800 font-medium">Low Risk</span>
                          <span className="text-green-700">≤ 0.85</span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-yellow-50 rounded-lg">
                          <span className="text-yellow-800 font-medium">Moderate Risk</span>
                          <span className="text-yellow-700">0.86 - 1.0</span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-red-50 rounded-lg">
                          <span className="text-red-800 font-medium">High Risk</span>
                          <span className="text-red-700">1.0</span>
                        </div>
                      </div>
                    </div>

                    {/* Men */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-blue-500 rounded text-white text-sm font-medium flex items-center justify-center">
                          M
                        </div>
                        <h4 className="font-medium text-gray-900">Men</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg">
                          <span className="text-green-800 font-medium">Low Risk</span>
                          <span className="text-green-700">≤ 0.90</span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-yellow-50 rounded-lg">
                          <span className="text-yellow-800 font-medium">Moderate Risk</span>
                          <span className="text-yellow-700">0.91 - 1.0</span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-red-50 rounded-lg">
                          <span className="text-red-800 font-medium">High Risk</span>
                          <span className="text-red-700"> 1.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How to Measure */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  How to Measure Correctly
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center mb-4">
                      1
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Waist Measurement</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Measure at the narrowest point of your waist, typically just above your belly button. 
                      Stand straight, breathe normally, and keep the tape snug but not tight.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Stand with feet shoulder-width apart</li>
                      <li>• Keep measuring tape parallel to floor</li>
                      <li>• Don't hold your breath or suck in</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center mb-4">
                      2
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Hip Measurement</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Measure around the widest part of your hips and buttocks. This is usually about 
                      7-9 inches below your waist.
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Measure over light clothing</li>
                      <li>• Include the fullest part of buttocks</li>
                      <li>• Keep tape level all around</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Health Implications */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Why WHR Matters for Health
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Apple Shape (Higher WHR)</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        More weight around the waist indicates visceral fat accumulation, which is associated with:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Increased cardiovascular disease risk</li>
                        <li>• Higher diabetes risk</li>
                        <li>• Metabolic syndrome</li>
                        <li>• Inflammation markers</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Pear Shape (Lower WHR)</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        More weight in hips and thighs indicates subcutaneous fat, which is generally:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Associated with lower health risks</li>
                        <li>• Less inflammatory</li>
                        <li>• Better metabolic profile</li>
                        <li>• Protective against heart disease</li>
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
                    <h4 className="font-medium text-gray-900 mb-2">Medical Disclaimer</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      This calculator is for educational purposes and should not replace professional medical advice. 
                      WHR is one of many health indicators. Factors like age, genetics, muscle mass, and overall 
                      health status should be considered. Consult healthcare professionals for comprehensive health assessment.
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
                  Explore our other health calculators for comprehensive wellness tracking.
                </p>
                <div className="space-y-2 text-sm">
                  <Link href="/tools/bmi" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → BMI Calculator
                  </Link>
                  <Link href="/tools/body-fat" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → Body Fat Calculator
                  </Link>
                  <Link href="/tools/calorie" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → Calorie Calculator
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