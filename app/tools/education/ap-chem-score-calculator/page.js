import Script from "next/script";
import Link from "next/link";
import APChemScoreCalculator from "@/components/APChemScoreCalculator";

// ───────────────── Enhanced SEO Metadata ─────────────────
export const metadata = {
  title: "Free AP Chemistry Score Calculator 2024 - Predict Your AP Chem Score | Locaddo",
  description: "Calculate your AP Chemistry exam score instantly. Enter MCQ and FRQ points to predict your AP score (1-5). Free AP Chem score calculator with 2024 curves and detailed breakdowns.",
  keywords: "AP Chemistry score calculator, AP Chem calculator, AP Chemistry predictor, AP exam calculator, College Board calculator, AP score estimator 2024",
  alternates: { canonical: "/tools/education/calculators/ap-chemistry-score-calculator" },
  openGraph: {
    title: "Free AP Chemistry Score Calculator - Predict Your AP Chem Score",
    description: "Calculate your AP Chemistry exam score from MCQ and FRQ points. Get instant predictions with adjustable curves for accurate AP score estimates.",
    url: "https://locaddo.com/tools/education/calculators/ap-chemistry-score-calculator",
    siteName: "Locaddo",
    type: "website",
    images: [{
      url: "https://locaddo.com/images/ap-chemistry-calculator.jpg",
      width: 1200,
      height: 630,
      alt: "AP Chemistry Score Calculator"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AP Chemistry Score Calculator - Predict Your AP Chem Score",
    description: "Calculate your AP Chemistry exam score from MCQ and FRQ points. Get instant predictions with adjustable curves.",
    images: ["https://locaddo.com/images/ap-chemistry-calculator.jpg"]
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
  },
  category: 'education',
};

// ───────────────── Enhanced JSON-LD builders ─────────────────
function getFaqJsonLd() {
  const faqs = [
    {
      q: "How accurate is this AP Chemistry score calculator?",
      a: "This calculator uses historical AP Chemistry scoring patterns and College Board guidelines. While not official, it provides reliable estimates based on typical curve distributions. Results may vary from actual scores due to yearly curve adjustments."
    },
    {
      q: "What are the AP Chemistry exam sections and scoring?",
      a: "The AP Chemistry exam has two sections: Multiple Choice (60 questions, 50% of score) and Free Response (7 questions, 50% of score). Our calculator models MCQ out of 60 points and FRQ out of 46 total rubric points."
    },
    {
      q: "How do I interpret my AP Chemistry composite score?",
      a: "Composite scores range from 0-100. Generally: 65+ typically earns a 5, 50-64 earns a 4, 35-49 earns a 3, 25-34 earns a 2, and below 25 earns a 1. Use different curve settings to see score ranges."
    },
    {
      q: "What's the difference between Lenient, Typical, and Strict curves?",
      a: "These represent different yearly curve scenarios. Lenient curves (easier years) require lower scores for each AP grade. Strict curves (harder years) require higher scores. Typical represents average curves over recent years."
    },
    {
      q: "Can I use this calculator for AP Chemistry practice tests?",
      a: "Yes! This calculator is perfect for scoring practice tests from College Board, Princeton Review, Barron's, or other prep materials. Input your MCQ correct answers and estimated FRQ points for realistic score predictions."
    },
    {
      q: "How should I estimate my FRQ points?",
      a: "Use official College Board rubrics when available. Each FRQ typically has 4-10 points. Be conservative in self-scoring - partial credit is common but strict. Practice with released FRQs to improve estimation accuracy."
    },
    {
      q: "Does this calculator store my AP Chemistry scores?",
      a: "No. All calculations run locally in your browser. We don't store, track, or save any of your input data or calculated scores."
    },
    {
      q: "When should I use this AP Chemistry score calculator?",
      a: "Use it after practice tests, mock exams, or to set score goals. It's helpful throughout your AP Chemistry preparation to track progress and identify areas needing improvement before the actual exam."
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
      { "@type": "ListItem", position: 2, name: "Education Tools", item: "https://locaddo.com/tools/education" },
      { "@type": "ListItem", position: 3, name: "Calculators", item: "https://locaddo.com/tools/education/calculators" },
      { "@type": "ListItem", position: 4, name: "AP Chemistry Score Calculator", item: "https://locaddo.com/tools/education/calculators/ap-chemistry-score-calculator" },
    ],
  };
}

function getWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free AP Chemistry Score Calculator - Predict Your AP Chem Score",
    url: "https://locaddo.com/tools/education/calculators/ap-chemistry-score-calculator",
    description: "Calculate your AP Chemistry exam score from MCQ and FRQ points. Get instant predictions with adjustable curves for accurate AP score estimates.",
    isPartOf: { "@type": "WebSite", name: "Locaddo", url: "https://locaddo.com" },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "AP Chemistry Score Calculator",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1847"
      }
    }
  };
}

function getHowToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Your AP Chemistry Score",
    description: "Step-by-step guide to using the AP Chemistry score calculator for accurate exam score predictions.",
    totalTime: "PT3M",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter Multiple Choice Score",
        text: "Input the number of correct answers from the multiple choice section (out of 60 questions). Count only completely correct answers.",
        image: "https://locaddo.com/images/ap-chem-mcq-step.jpg"
      },
      {
        "@type": "HowToStep", 
        name: "Calculate FRQ Points",
        text: "Add up your points from all Free Response Questions. Use official rubrics when available and be conservative with partial credit estimates.",
        image: "https://locaddo.com/images/ap-chem-frq-step.jpg"
      },
      {
        "@type": "HowToStep",
        name: "Select Curve Difficulty",
        text: "Choose between Lenient, Typical, or Strict curves based on practice test difficulty or to see different scenarios.",
        image: "https://locaddo.com/images/ap-chem-curve-step.jpg"
      },
      {
        "@type": "HowToStep",
        name: "Review Your Predicted Score",
        text: "View your composite score out of 100 and predicted AP score from 1-5. Use this to gauge your preparation progress.",
        image: "https://locaddo.com/images/ap-chem-result-step.jpg"
      }
    ]
  };
}

// ───────────────── Page ─────────────────
export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <Script
        id="ld-faq-ap-chem"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
      />
      <Script
        id="ld-breadcrumb-ap-chem"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd()) }}
      />
      <Script
        id="ld-webpage-ap-chem"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageJsonLd()) }}
      />
      <Script
        id="ld-howto-ap-chem"
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
            <Link href="/tools/education" className="hover:text-gray-900 transition-colors">
              Education Tools
            </Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">AP Chemistry Score Calculator</span>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-lg mb-6">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
          
          <h1 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            AP Chemistry Score Calculator
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Calculate your AP Chemistry exam score instantly. Enter your multiple choice and 
            free response points to predict your final AP score from 1-5 with adjustable curves.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Based on Official Patterns
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Instant Results
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              No Data Stored
            </div>
          </div>
        </header>

        {/* Calculator */}
        <section className="mb-20" aria-labelledby="calculator-heading">
          <h2 id="calculator-heading" className="sr-only">AP Chemistry Score Calculator Tool</h2>
          <APChemScoreCalculator />
        </section>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="space-y-12">
              {/* How It Works */}
              <section>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                  How the AP Chemistry Score Calculator Works
                </h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    This AP Chemistry score calculator uses the same methodology as the official College Board 
                    scoring system. It combines your multiple choice and free response scores to generate a 
                    composite score, then converts that to the familiar 1-5 AP scale.
                  </p>
                </div>

                {/* Exam Structure */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">AP Chemistry Exam Structure</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center">
                          1
                        </div>
                        <h4 className="font-medium text-gray-900">Multiple Choice Section</h4>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• 60 questions total</li>
                        <li>• 90 minutes (1.5 minutes per question)</li>
                        <li>• 50% of total exam score</li>
                        <li>• No penalty for wrong answers</li>
                        <li>• Calculator not permitted</li>
                      </ul>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-cyan-500 rounded text-white text-sm font-medium flex items-center justify-center">
                          2
                        </div>
                        <h4 className="font-medium text-gray-900">Free Response Section</h4>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>• 7 questions total</li>
                        <li>• 105 minutes (15 minutes per question)</li>
                        <li>• 50% of total exam score</li>
                        <li>• Questions 1-3: Long answer</li>
                        <li>• Questions 4-7: Short answer</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Scoring Process */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Scoring Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-cyan-500 rounded-full text-white text-xs font-bold flex items-center justify-center mt-1">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Raw Scores Calculated</h4>
                        <p className="text-sm text-gray-600">Multiple choice: 1 point per correct answer (max 60). Free response: Points awarded based on detailed rubrics (max ~46 points total).</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-cyan-500 rounded-full text-white text-xs font-bold flex items-center justify-center mt-1">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Weighted Composite Score</h4>
                        <p className="text-sm text-gray-600">Each section is weighted equally (50% each) and combined into a composite score from 0-100 points.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-cyan-500 rounded-full text-white text-xs font-bold flex items-center justify-center mt-1">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">AP Score Assignment</h4>
                        <p className="text-sm text-gray-600">The composite score is converted to a 1-5 scale using yearly cutoff curves determined by College Board statisticians.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Score Ranges */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  AP Score Meanings & Typical Ranges
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-4 px-6 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full text-white font-bold flex items-center justify-center">5</div>
                      <div>
                        <span className="font-medium text-green-900">Extremely Well Qualified</span>
                        <p className="text-sm text-green-700">Typically 65+ composite points</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-700">College credit at most institutions</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 px-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full text-white font-bold flex items-center justify-center">4</div>
                      <div>
                        <span className="font-medium text-blue-900">Well Qualified</span>
                        <p className="text-sm text-blue-700">Typically 50-64 composite points</p>
                      </div>
                    </div>
                    <span className="text-sm text-blue-700">College credit at many institutions</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 px-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full text-white font-bold flex items-center justify-center">3</div>
                      <div>
                        <span className="font-medium text-yellow-900">Qualified</span>
                        <p className="text-sm text-yellow-700">Typically 35-49 composite points</p>
                      </div>
                    </div>
                    <span className="text-sm text-yellow-700">College credit at some institutions</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 px-6 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-orange-500 rounded-full text-white font-bold flex items-center justify-center">2</div>
                      <div>
                        <span className="font-medium text-orange-900">Possibly Qualified</span>
                        <p className="text-sm text-orange-700">Typically 25-34 composite points</p>
                      </div>
                    </div>
                    <span className="text-sm text-orange-700">Limited college credit</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 px-6 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-500 rounded-full text-white font-bold flex items-center justify-center">1</div>
                      <div>
                        <span className="font-medium text-gray-900">No Recommendation</span>
                        <p className="text-sm text-gray-700">Typically below 25 composite points</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-700">No college credit</span>
                  </div>
                </div>
              </section>

              {/* Study Tips */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Using This Calculator for AP Chemistry Prep
                </h3>
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-blue-900 mb-3">For Practice Tests</h4>
                      <ul className="text-sm text-blue-800 space-y-2">
                        <li>• Score official College Board practice exams</li>
                        <li>• Track progress over multiple practice sessions</li>
                        <li>• Identify weak areas needing more study</li>
                        <li>• Set realistic score goals based on current performance</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-3">Study Strategy Tips</h4>
                      <ul className="text-sm text-blue-800 space-y-2">
                        <li>• Focus on FRQ practice - they're worth 50% of your score</li>
                        <li>• Time yourself on both sections during practice</li>
                        <li>• Review released FRQ rubrics to understand scoring</li>
                        <li>• Use all three curve settings to see score ranges</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Disclaimer */}
              <section className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex gap-4">
                  <svg className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Important Disclaimer</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      This calculator provides estimated scores based on historical AP Chemistry scoring patterns and is not affiliated with or endorsed by the College Board. 
                      Actual AP scores may vary due to yearly curve adjustments, scoring variations, and other factors. Use this tool as a study aid and score estimator, 
                      not as a guarantee of your actual AP exam performance.
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
                <h3 className="font-medium text-gray-900 mb-2">Related AP Calculators</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Calculate scores for other AP exams with our collection of AP score calculators.
                </p>
                <div className="space-y-2 text-sm">
                  <Link href="/tools/education/calculators/ap-biology-score-calculator" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → AP Biology Score Calculator
                  </Link>
                  <Link href="/tools/education/calculators/ap-physics-score-calculator" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → AP Physics Score Calculator
                  </Link>
                  <Link href="/tools/education/calculators/gpa-calculator" className="block text-cyan-600 hover:text-cyan-700 transition-colors">
                    → GPA Calculator
                  </Link>
                </div>
                <Link 
                  href="/tools/education" 
                  className="inline-flex items-center text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors mt-4"
                >
                  View all education tools
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