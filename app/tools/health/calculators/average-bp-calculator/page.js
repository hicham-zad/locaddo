import React from "react";
import Script from "next/script";
import Link from "next/link";
import AverageBPCalculator from "@/components/AverageBPCalculator";


// ---------- SEO Metadata ----------
export const metadata = {
  title: "Free Average Blood Pressure Calculator - Track BP Readings Over Time | Locaddo",
  description:
    "Calculate your average blood pressure from multiple readings. Track systolic and diastolic BP patterns over time with our free calculator. Get accurate averages and health insights.",
  keywords: "average blood pressure calculator, BP calculator, blood pressure tracker, systolic diastolic average, blood pressure monitoring, hypertension calculator",
  alternates: { canonical: "/tools/average-blood-pressure" },
  openGraph: {
    title: "Free Average Blood Pressure Calculator | Track BP Over Time",
    description:
      "Calculate average blood pressure from multiple readings. Get accurate BP averages and understand your cardiovascular health patterns.",
    url: "https://locaddo.com/tools/average-blood-pressure",
    siteName: "Locaddo",
    type: "website",
    images: [{
      url: "https://locaddo.com/images/blood-pressure-calculator.jpg",
      width: 1200,
      height: 630,
      alt: "Average Blood Pressure Calculator"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Average Blood Pressure Calculator | Track BP Over Time",
    description:
      "Calculate average blood pressure from multiple readings. Get accurate BP tracking and health insights.",
    images: ["https://locaddo.com/images/blood-pressure-calculator.jpg"]
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
      q: "Why should I calculate my average blood pressure?",
      a: "Blood pressure varies throughout the day due to factors like stress, activity, and time of day. Calculating an average from multiple readings gives a more accurate picture of your overall cardiovascular health than a single measurement."
    },
    {
      q: "How many blood pressure readings do I need for an accurate average?",
      a: "For the most reliable average, take at least 3-5 readings over different days and times. The American Heart Association recommends taking multiple measurements and using the average for the most accurate assessment."
    },
    {
      q: "When is the best time to measure blood pressure?",
      a: "Measure blood pressure at the same times each day, ideally in the morning before medications and in the evening. Avoid measuring right after exercise, eating, or stressful activities as these can temporarily elevate readings."
    },
    {
      q: "What do the blood pressure numbers mean?",
      a: "Blood pressure is measured as systolic over diastolic (e.g., 120/80 mmHg). Systolic is the pressure when your heart beats, diastolic is the pressure when your heart rests between beats."
    },
    {
      q: "What is considered normal average blood pressure?",
      a: "Normal blood pressure is typically less than 120/80 mmHg. Elevated is 120-129 systolic and less than 80 diastolic. High blood pressure (hypertension) is 130/80 mmHg or higher."
    },
    {
      q: "How often should I monitor my blood pressure?",
      a: "If you have normal blood pressure, annual checks are sufficient. Those with elevated or high blood pressure should monitor more frequently as recommended by their healthcare provider, often daily or weekly."
    },
    {
      q: "Can I rely on home blood pressure monitors?",
      a: "Yes, if properly calibrated and validated. Look for monitors validated by the British Hypertension Society or American Heart Association. Regular calibration against professional equipment ensures accuracy."
    },
    {
      q: "What factors can affect blood pressure readings?",
      a: "Many factors influence blood pressure including time of day, recent physical activity, stress levels, caffeine intake, smoking, full bladder, arm position, and cuff size. Consistent measurement conditions improve accuracy."
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
      { "@type": "ListItem", position: 3, name: "Average Blood Pressure Calculator", item: "https://locaddo.com/tools/average-blood-pressure" },
    ],
  };
}

function getWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free Average Blood Pressure Calculator - Track BP Readings Over Time",
    url: "https://locaddo.com/tools/average-blood-pressure",
    description: "Calculate your average blood pressure from multiple readings. Track systolic and diastolic BP patterns over time with accurate averages and health insights.",
    isPartOf: { "@type": "WebSite", name: "Locaddo", url: "https://locaddo.com" },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Average Blood Pressure Calculator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.6",
        ratingCount: "1156"
      }
    }
  };
}

function getHowToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Average Blood Pressure",
    description: "Learn how to properly measure and calculate your average blood pressure for accurate cardiovascular health monitoring.",
    totalTime: "PT10M",
    supply: [
      { "@type": "HowToSupply", name: "Digital blood pressure monitor" },
      { "@type": "HowToSupply", name: "Proper size blood pressure cuff" }
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Prepare for Measurement",
        text: "Sit quietly for 5 minutes before measuring. Avoid caffeine, exercise, and smoking for at least 30 minutes prior. Use the bathroom if needed.",
        image: "https://locaddo.com/images/bp-preparation.jpg"
      },
      {
        "@type": "HowToStep", 
        name: "Take Multiple Readings",
        text: "Take 2-3 readings at least 1 minute apart, at the same time of day. Record both systolic and diastolic values for each measurement.",
        image: "https://locaddo.com/images/bp-measurement.jpg"
      },
      {
        "@type": "HowToStep",
        name: "Record Your Readings",
        text: "Write down all readings with dates and times. Note any factors that might affect readings like stress, medications, or recent activities.",
        image: "https://locaddo.com/images/bp-recording.jpg"
      },
      {
        "@type": "HowToStep",
        name: "Calculate the Average",
        text: "Add all systolic readings and divide by the number of readings. Do the same for diastolic readings. Use our calculator for automatic computation.",
        image: "https://locaddo.com/images/bp-calculation.jpg"
      }
    ]
  };
}

// ---------- Page ----------
export default function AverageBPCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <Script
        id="ld-faq-bp"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
      />
      <Script
        id="ld-breadcrumb-bp"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd()) }}
      />
      <Script
        id="ld-webpage-bp"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageJsonLd()) }}
      />
      <Script
        id="ld-howto-bp"
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
            <span className="text-gray-900">Average Blood Pressure Calculator</span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-lg mb-6">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          
          <h1 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            Average Blood Pressure Calculator
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Track and calculate your average blood pressure from multiple readings. 
            Get accurate insights into your cardiovascular health patterns over time.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Medically Accurate
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Privacy Protected
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Trending Patterns
            </div>
          </div>
        </header>

        {/* Calculator */}
        <section className="mb-20" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="sr-only">Average Blood Pressure Calculator Tool</h2>
          <AverageBPCalculator />
        </section>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="space-y-12">
              {/* Understanding Blood Pressure */}
              <section>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                  Understanding Blood Pressure Averages
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    Blood pressure naturally fluctuates throughout the day due to physical activity, stress, 
                    medications, and circadian rhythms. A single reading provides only a snapshot, while 
                    calculating an average from multiple measurements gives healthcare providers and patients 
                    a more accurate picture of overall cardiovascular health.
                  </p>
                </div>

                {/* Blood Pressure Categories */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Blood Pressure Categories</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-4 px-6 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-900">Normal</span>
                      </div>
                      <span className="text-green-800 font-medium">Less than 120/80 mmHg</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-4 px-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium text-yellow-900">Elevated</span>
                      </div>
                      <span className="text-yellow-800 font-medium">120-129 systolic, less than 80 diastolic</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-4 px-6 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        <span className="font-medium text-orange-900">High Blood Pressure Stage 1</span>
                      </div>
                      <span className="text-orange-800 font-medium">130-139/80-89 mmHg</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-4 px-6 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="font-medium text-red-900">High Blood Pressure Stage 2</span>
                      </div>
                      <span className="text-red-800 font-medium">140/90 mmHg or higher</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-4 px-6 bg-red-100 border border-red-300 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-red-700 rounded-full"></div>
                        <span className="font-medium text-red-900">Hypertensive Crisis</span>
                      </div>
                      <span className="text-red-800 font-medium">Higher than 180/120 mmHg</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Proper Measurement Technique */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Proper Blood Pressure Measurement
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Before Measuring</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Sit quietly for 5 minutes
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Avoid caffeine for 30 minutes
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Empty your bladder
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Avoid exercise for 30 minutes
                      </li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">During Measurement</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Sit with feet flat on floor
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Support arm at heart level
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Use proper cuff size
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Take 2-3 readings, 1 minute apart
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* When to Seek Medical Attention */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  When to Contact Your Healthcare Provider
                </h3>
                <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                  <div className="flex gap-4">
                    <svg className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-red-900 mb-3">Seek Immediate Medical Attention If:</h4>
                      <ul className="text-sm text-red-800 space-y-2">
                        <li>• Blood pressure is higher than 180/120 mmHg</li>
                        <li>• You experience chest pain, shortness of breath, or severe headache</li>
                        <li>• You have vision changes or difficulty speaking</li>
                        <li>• Your average readings consistently show high blood pressure</li>
                        <li>• You have symptoms of a stroke or heart attack</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Medical Disclaimer */}
              <section className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex gap-4">
                  <svg className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Important Medical Disclaimer</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      This calculator is for educational purposes only and should not replace professional medical advice. 
                      Blood pressure measurements and their interpretation should always be discussed with qualified healthcare 
                      professionals. Do not use this tool to diagnose or treat any medical condition. If you have concerns 
                      about your blood pressure, consult your doctor immediately.
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
              
              {/* Related Tools CTA */}
              <div className="mt-8 p-6 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Related Health Tools</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Explore our other cardiovascular and health monitoring calculators.
                </p>
                <div className="space-y-2 text-sm">
                  <Link href="/tools/bmi" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → BMI Calculator
                  </Link>
                  <Link href="/tools/heart-rate" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → Heart Rate Calculator
                  </Link>
                  <Link href="/tools/cardiovascular-risk" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → Cardiovascular Risk Calculator
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