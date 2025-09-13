import Script from "next/script";
import Link from "next/link";

// ───────────────── SEO Metadata ─────────────────
export const metadata = {
  title: "Free Education Calculators & Tools - GPA, AP Score, Grade Calculators | Locaddo",
  description: "Free online education calculators for students and teachers. Calculate GPA, AP scores, grades, student loans, and college costs. Essential academic planning tools.",
  keywords: "education calculators, GPA calculator, AP score calculator, grade calculator, student loan calculator, college cost calculator, academic tools",
  alternates: { canonical: "/tools/education" },
  openGraph: {
    title: "Free Education Calculators & Academic Tools | Locaddo",
    description: "Complete collection of free education calculators. GPA calculator, AP score calculators, grade tools, and student financial planning resources.",
    url: "https://locaddo.com/tools/education",
    siteName: "Locaddo",
    type: "website",
    images: [{
      url: "https://locaddo.com/images/education-tools.jpg",
      width: 1200,
      height: 630,
      alt: "Education Calculators and Academic Tools"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Education Calculators & Academic Tools | Locaddo",
    description: "Complete collection of free education calculators for students and educators.",
    images: ["https://locaddo.com/images/education-tools.jpg"]
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

// ───────────────── Education Tools Data ─────────────────
const EDUCATION_TOOLS = {
  calculators: [
    {
      name: "GPA Calculator",
      slug: "gpa-calculator",
      icon: "📊",
      description: "Calculate your Grade Point Average from course grades and credit hours. Supports weighted and unweighted GPA calculations.",
      searchVolume: "High",
      difficulty: "Medium",
      features: ["4.0 and 5.0 scales", "Semester & cumulative GPA", "Grade prediction"]
    },
    {
      name: "Grade Calculator", 
      slug: "grade-calculator",
      icon: "📝",
      description: "Calculate current grades and determine what you need on future assignments to reach your target grade.",
      searchVolume: "High",
      difficulty: "Low",
      features: ["Assignment weighting", "Final exam calculator", "Grade goals"]
    },
    {
      name: "AP Chemistry Score Calculator",
      slug: "ap-chemistry-score-calculator", 
      icon: "🧪",
      description: "Predict your AP Chemistry exam score from MCQ and FRQ points with adjustable scoring curves.",
      searchVolume: "Medium",
      difficulty: "Low",
      features: ["MCQ + FRQ scoring", "Multiple curves", "Score prediction"],
      popular: true
    },
    {
      name: "AP Biology Score Calculator",
      slug: "ap-biology-score-calculator",
      icon: "🧬", 
      description: "Calculate your AP Biology exam score using multiple choice and free response question points.",
      searchVolume: "Medium",
      difficulty: "Low",
      features: ["Official scoring patterns", "Curve adjustments", "Detailed breakdown"]
    },
    {
      name: "AP Physics Score Calculator",
      slug: "ap-physics-score-calculator",
      icon: "⚡",
      description: "Estimate AP Physics 1, 2, C Mechanics, and C E&M exam scores from your practice test results.",
      searchVolume: "Medium", 
      difficulty: "Low",
      features: ["Multiple AP Physics exams", "Section weighting", "Score ranges"]
    },
    {
      name: "SAT Score Calculator",
      slug: "sat-score-calculator",
      icon: "📋",
      description: "Convert SAT raw scores to scaled scores and calculate section and composite scores.",
      searchVolume: "High",
      difficulty: "Medium",
      features: ["Math + EBRW sections", "Error calculations", "Score ranges"]
    }
  ],
  planning: [
    {
      name: "Student Loan Calculator",
      slug: "student-loan-calculator",
      icon: "🎓",
      description: "Calculate monthly payments, total interest, and repayment schedules for student loans.",
      searchVolume: "Very High",
      difficulty: "High",
      features: ["Federal & private loans", "Repayment plans", "Interest calculations"],
      popular: true
    },
    {
      name: "College Cost Calculator", 
      slug: "college-cost-calculator",
      icon: "💰",
      description: "Estimate total college costs including tuition, room, board, and other expenses over 4 years.",
      searchVolume: "High",
      difficulty: "Medium", 
      features: ["4-year projections", "Financial aid", "Living expenses"]
    },
    {
      name: "Scholarship Calculator",
      slug: "scholarship-calculator",
      icon: "🏆",
      description: "Calculate how scholarships and grants affect your total college costs and loan needs.",
      searchVolume: "Medium",
      difficulty: "Low",
      features: ["Merit & need-based aid", "Net cost calculation", "Loan reduction"]
    },
    {
      name: "Class Schedule Planner",
      slug: "class-schedule-planner", 
      icon: "📅",
      description: "Plan your class schedule with time conflicts detection and credit hour tracking.",
      searchVolume: "Low",
      difficulty: "Low",
      features: ["Conflict detection", "Credit tracking", "Visual timeline"]
    }
  ],
  analysis: [
    {
      name: "Study Time Calculator",
      slug: "study-time-calculator",
      icon: "⏰", 
      description: "Calculate optimal study time allocation based on course difficulty and your goals.",
      searchVolume: "Low",
      difficulty: "Low",
      features: ["Time allocation", "Difficulty weighting", "Schedule optimization"]
    },
    {
      name: "Reading Speed Calculator",
      slug: "reading-speed-calculator",
      icon: "📖",
      description: "Test your reading speed and calculate time needed to complete reading assignments.",
      searchVolume: "Low", 
      difficulty: "Low",
      features: ["WPM calculation", "Assignment planning", "Speed improvement"]
    },
    {
      name: "Class Rank Calculator",
      slug: "class-rank-calculator", 
      icon: "🥇",
      description: "Calculate your class rank and percentile based on GPA and class size.",
      searchVolume: "Low",
      difficulty: "Low", 
      features: ["Percentile ranking", "GPA comparison", "Rank prediction"]
    }
  ]
};

// ───────────────── JSON-LD builders ─────────────────
function getBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://locaddo.com/" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://locaddo.com/tools" },
      { "@type": "ListItem", position: 3, name: "Education", item: "https://locaddo.com/tools/education" },
    ],
  };
}

function getWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Education Calculators & Academic Tools",
    url: "https://locaddo.com/tools/education",
    description: "Complete collection of free education calculators for students and teachers. GPA calculator, AP score calculators, grade tools, and financial planning resources.",
    isPartOf: { "@type": "WebSite", name: "Locaddo", url: "https://locaddo.com" },
    mainEntity: {
      "@type": "ItemList", 
      numberOfItems: Object.values(EDUCATION_TOOLS).flat().length,
      itemListElement: Object.values(EDUCATION_TOOLS).flat().map((tool, index) => ({
        "@type": "SoftwareApplication",
        position: index + 1,
        name: tool.name,
        applicationCategory: "EducationalApplication",
        url: `https://locaddo.com/tools/education/calculators/${tool.slug}`,
        description: tool.description
      }))
    }
  };
}

function getFaqJsonLd() {
  const faqs = [
    {
      q: "What education calculators are available for free?",
      a: "We offer GPA calculators, AP score calculators for Chemistry/Biology/Physics, grade calculators, student loan calculators, and college cost planning tools. All are completely free to use."
    },
    {
      q: "How accurate are the AP score calculators?",
      a: "Our AP calculators use official College Board scoring patterns and historical curve data. While not official, they provide reliable estimates based on typical scoring distributions."
    },
    {
      q: "Can I calculate my GPA for different grading scales?",
      a: "Yes, our GPA calculator supports both 4.0 and 5.0 scales, weighted and unweighted calculations, and can handle different grading systems."
    },
    {
      q: "Do the student loan calculators include different repayment plans?",
      a: "Yes, our student loan calculator includes standard repayment, graduated, extended, and income-driven repayment plans for federal student loans."
    },
    {
      q: "Are these education tools suitable for high school and college students?",
      a: "Yes, our tools are designed for students at all levels - high school students preparing for AP exams and college, current college students managing coursework, and graduates planning loan repayment."
    },
    {
      q: "Do you store any of my academic information?",
      a: "No, all calculations run locally in your browser. We don't store, save, or track any of your grades, scores, or personal academic information."
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

// ───────────────── Page Component ─────────────────
export default function EducationToolsPage() {
  const allTools = Object.values(EDUCATION_TOOLS).flat();
  const popularTools = allTools.filter(tool => tool.popular);

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <Script
        id="ld-breadcrumb-education"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd()) }}
      />
      <Script
        id="ld-webpage-education"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageJsonLd()) }}
      />
      <Script
        id="ld-faq-education"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
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
            <Link href="/tools" className="hover:text-gray-900 transition-colors">
              Tools
            </Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">Education</span>
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
            Education Calculators & Academic Tools
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Free online calculators for students, teachers, and parents. Calculate GPA, predict AP scores, 
            plan college costs, and make informed academic decisions with our comprehensive education tools.
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Academically Accurate
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Student-Tested
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Privacy Protected
            </div>
          </div>
        </header>

        {/* Popular Tools */}
        {popularTools.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Most Popular Education Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {popularTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} category="calculators" featured={true} />
              ))}
            </div>
          </section>
        )}

        {/* Tool Categories */}
        <div className="space-y-16">
          {/* Academic Calculators */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📊</span>
              <h2 className="text-2xl font-semibold text-gray-900">Academic Calculators</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Essential calculators for tracking academic progress, calculating grades, and predicting test scores.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EDUCATION_TOOLS.calculators.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} category="calculators" />
              ))}
            </div>
          </section>

          {/* Planning Tools */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📋</span>
              <h2 className="text-2xl font-semibold text-gray-900">Planning & Financial Tools</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Plan your education finances with loan calculators, cost estimators, and scholarship tools.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EDUCATION_TOOLS.planning.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} category="planning" />
              ))}
            </div>
          </section>

          {/* Analysis Tools */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📈</span>
              <h2 className="text-2xl font-semibold text-gray-900">Study & Analysis Tools</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Optimize your study habits and track academic performance with specialized analysis tools.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EDUCATION_TOOLS.analysis.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} category="analysis" />
              ))}
            </div>
          </section>
        </div>

        {/* Benefits Section */}
        <section className="mt-20 py-16 bg-gray-50 rounded-2xl">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">Why Use Our Education Tools</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Academically Accurate</h3>
                <p className="text-gray-600">Based on official educational standards, grading systems, and institutional requirements.</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Time</h3>
                <p className="text-gray-600">Instant calculations that would take hours to do manually. Focus on learning, not calculating.</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 003.75-15.734m-13.5 15.734a14.406 14.406 0 003.75-15.734m-3.75 15.734V21a2.25 2.25 0 004.5 0v-.57m6-1.677v1.677a2.25 2.25 0 01-4.5 0v-1.677m0 0v-.165a12 12 0 019-8.834l-1.577-1.577a14.406 14.406 0 00-3.423-2.33" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Plan Better</h3>
                <p className="text-gray-600">Make informed decisions about courses, colleges, and financial planning with reliable data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {getFaqJsonLd().mainEntity.map((faq, index) => (
              <details key={index} className="group border border-gray-200 rounded-lg">
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                  <span>{faq.name}</span>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// ───────────────── Tool Card Component ─────────────────
function ToolCard({ tool, category, featured = false }) {
  const difficultyColors = {
    "Low": "bg-green-100 text-green-800",
    "Medium": "bg-yellow-100 text-yellow-800", 
    "High": "bg-red-100 text-red-800"
  };

  const volumeColors = {
    "Low": "bg-gray-100 text-gray-600",
    "Medium": "bg-blue-100 text-blue-600",
    "High": "bg-purple-100 text-purple-600",
    "Very High": "bg-indigo-100 text-indigo-600"
  };

  return (
    <Link
      href={`/tools/education/${category}/${tool.slug}`}
      className={`group block bg-white border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ${
        featured ? 'border-cyan-200 bg-cyan-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{tool.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900 leading-tight">{tool.name}</h3>
            {tool.popular && (
              <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 mt-1">
                Popular
              </span>
            )}
          </div>
        </div>
        <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {tool.description}
      </p>
      
      {tool.features && (
        <div className="space-y-2 mb-4">
          {tool.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-3 h-3 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-2 mt-4">
        <span className={`text-xs px-2 py-1 rounded-full ${volumeColors[tool.searchVolume]}`}>
          {tool.searchVolume} Volume
        </span>
        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[tool.difficulty]}`}>
          {tool.difficulty} SEO
        </span>
      </div>
    </Link>
  );
}