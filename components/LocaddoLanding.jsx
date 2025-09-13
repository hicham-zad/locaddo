"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  Flame,
  HeartPulse,
  PercentCircle,
  PiggyBank,
  Search,
  Sparkles,
  TrendingUp,
  Wand2,
  Zap,
} from "lucide-react";

// ---- Tool Registry with SEO-optimized structure ----
const HEALTH_TOOLS = [
  { 
    name: "BMI Calculator", 
    slug: "bmi-calculator", 
    category: "calculators",
    icon: <HeartPulse className="w-5 h-5" />, 
    blurb: "Calculate Body Mass Index from height and weight with health risk assessment.", 
    popular: true,
    searchVolume: "High",
    metaDesc: "Free BMI calculator with instant results. Calculate your Body Mass Index and get health category assessment."
  },
  { 
    name: "Waist-to-Hip Ratio Calculator", 
    slug: "waist-hip-ratio", 
    category: "calculators",
    icon: <HeartPulse className="w-5 h-5" />, 
    blurb: "Assess health risks through body fat distribution patterns.",
    popular: true,
    searchVolume: "Medium",
    metaDesc: "Calculate waist-to-hip ratio to assess cardiovascular health risks and body fat distribution."
  },
  { 
    name: "Body Frame Size Calculator", 
    slug: "body-frame-size", 
    category: "calculators",
    icon: <HeartPulse className="w-5 h-5" />, 
    blurb: "Determine if you have small, medium, or large frame using wrist measurements.",
    searchVolume: "Low",
    metaDesc: "Calculate your body frame size using wrist and elbow measurements for accurate weight goals."
  },
  { 
    name: "Average Blood Pressure Calculator", 
    slug: "average-blood-pressure", 
    category: "calculators",
    icon: <HeartPulse className="w-5 h-5" />, 
    blurb: "Track and calculate average BP from multiple readings over time.",
    searchVolume: "Medium",
    metaDesc: "Calculate average blood pressure from multiple readings with health risk assessment."
  },
  { 
    name: "Calorie Calculator", 
    slug: "calorie-calculator", 
    category: "calculators",
    icon: <Flame className="w-5 h-5" />, 
    blurb: "Calculate daily calorie needs based on activity level and goals.",
    searchVolume: "High",
    metaDesc: "Calculate daily calorie needs for weight loss, maintenance, or muscle gain."
  },
  { 
    name: "Protein Calculator", 
    slug: "protein-calculator", 
    category: "nutrition",
    icon: <Flame className="w-5 h-5" />, 
    blurb: "Determine optimal daily protein intake for your fitness goals.",
    searchVolume: "High",
    metaDesc: "Calculate daily protein requirements for muscle building, weight loss, and health."
  },
  { 
    name: "Water Intake Calculator", 
    slug: "water-intake-calculator", 
    category: "calculators",
    icon: <HeartPulse className="w-5 h-5" />, 
    blurb: "Calculate personalized daily hydration needs based on activity.",
    searchVolume: "Medium",
    metaDesc: "Calculate daily water intake needs based on weight, activity, and climate."
  },
  { 
    name: "Heart Rate Zones Calculator", 
    slug: "heart-rate-zones", 
    category: "fitness",
    icon: <HeartPulse className="w-5 h-5" />, 
    blurb: "Calculate training zones from maximum heart rate for optimal workouts.",
    searchVolume: "Medium",
    metaDesc: "Calculate heart rate training zones for cardio, fat burning, and endurance."
  },
  { 
    name: "Pregnancy Due Date Calculator", 
    slug: "pregnancy-due-date", 
    category: "women-health",
    icon: <Calendar className="w-5 h-5" />, 
    blurb: "Calculate estimated due date from last menstrual period.",
    popular: true,
    searchVolume: "High",
    metaDesc: "Calculate pregnancy due date and track pregnancy weeks with accurate estimates."
  },
  { 
    name: "Ovulation Calculator", 
    slug: "ovulation-calculator", 
    category: "women-health",
    icon: <Calendar className="w-5 h-5" />, 
    blurb: "Calculate fertile window and ovulation dates for family planning.",
    popular: true,
    searchVolume: "High",
    metaDesc: "Calculate ovulation dates and fertile window for pregnancy planning."
  },
];

const FINANCE_TOOLS = [
  { 
    name: "Mortgage Calculator", 
    slug: "mortgage-calculator", 
    category: "calculators",
    icon: <DollarSign className="w-5 h-5" />, 
    blurb: "Calculate monthly payments, interest, and amortization schedules.",
    popular: true,
    searchVolume: "Very High",
    metaDesc: "Calculate mortgage payments, interest rates, and loan amortization schedules."
  },
  { 
    name: "Loan Calculator", 
    slug: "loan-calculator", 
    category: "calculators",
    icon: <DollarSign className="w-5 h-5" />, 
    blurb: "Calculate EMI, total interest, and repayment schedules for loans.",
    popular: true,
    searchVolume: "High",
    metaDesc: "Calculate loan EMI, interest payments, and repayment schedules for any loan."
  },
  { 
    name: "Compound Interest Calculator", 
    slug: "compound-interest-calculator", 
    category: "calculators",
    icon: <TrendingUp className="w-5 h-5" />, 
    blurb: "Calculate future value with compound interest over time.",
    searchVolume: "High",
    metaDesc: "Calculate compound interest growth and investment returns over time."
  },
  { 
    name: "Simple Interest Calculator", 
    slug: "simple-interest-calculator", 
    category: "calculators",
    icon: <PercentCircle className="w-5 h-5" />, 
    blurb: "Quick calculations for simple interest on loans and investments.",
    searchVolume: "Medium",
    metaDesc: "Calculate simple interest for loans, deposits, and short-term investments."
  },
  { 
    name: "Savings Calculator", 
    slug: "savings-calculator", 
    category: "planning",
    icon: <PiggyBank className="w-5 h-5" />, 
    blurb: "Calculate monthly savings needed to reach financial goals.",
    searchVolume: "Medium",
    metaDesc: "Calculate monthly savings required to reach your financial goals and targets."
  },
  { 
    name: "Retirement Calculator", 
    slug: "retirement-calculator", 
    category: "planning",
    icon: <BarChart3 className="w-5 h-5" />, 
    blurb: "Plan retirement savings and estimate nest egg requirements.",
    searchVolume: "High",
    metaDesc: "Calculate retirement savings needs and monthly contributions required."
  },
  { 
    name: "ROI Calculator", 
    slug: "roi-calculator", 
    category: "calculators",
    icon: <TrendingUp className="w-5 h-5" />, 
    blurb: "Calculate return on investment percentage and profit analysis.",
    searchVolume: "Medium",
    metaDesc: "Calculate return on investment (ROI) percentage for business and investments."
  },
  { 
    name: "Credit Card Payoff Calculator", 
    slug: "credit-card-payoff-calculator", 
    category: "calculators",
    icon: <Clock className="w-5 h-5" />, 
    blurb: "Calculate time and interest to pay off credit card debt.",
    searchVolume: "High",
    metaDesc: "Calculate credit card payoff time and interest savings strategies."
  },
];

const CATEGORIES = [
  {
    key: "health",
    label: "Health & Fitness",
    emoji: "🏥",
    description: "Wellness calculators to plan, track, and improve your health with medically accurate formulas.",
    icon: <HeartPulse className="w-5 h-5" />,
    tools: HEALTH_TOOLS,
    seoTitle: "Free Health Calculators - BMI, Calorie, Fitness Tools",
    seoDesc: "Free health calculators including BMI, calorie needs, body fat, heart rate zones, and pregnancy tools."
  },
  {
    key: "finance",
    label: "Finance & Money",
    emoji: "💰",
    description: "Financial calculators for smart money decisions, loans, investments, and retirement planning.",
    icon: <DollarSign className="w-5 h-5" />,
    tools: FINANCE_TOOLS,
    seoTitle: "Free Financial Calculators - Mortgage, Loan, Investment Tools",
    seoDesc: "Free financial calculators for mortgages, loans, investments, retirement planning, and savings goals."
  },
];

export default function LocaddoLanding() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const allTools = useMemo(() => 
    CATEGORIES.flatMap((c) => 
      c.tools.map((t) => ({ 
        ...t, 
        categoryKey: c.key,
        categoryLabel: c.label,
        href: `/tools/${c.key}/${t.category}/${t.slug}`
      }))
    ), []
  );

  const filteredTools = useMemo(() => {
    return allTools.filter((t) => {
      const matchQuery = query
        ? (t.name + " " + t.blurb).toLowerCase().includes(query.toLowerCase())
        : true;
      const matchCat = activeCategory === "all" ? true : t.categoryKey === activeCategory;
      return matchQuery && matchCat;
    });
  }, [allTools, query, activeCategory]);

  const popularTools = useMemo(() => 
    allTools.filter((t) => t.popular).slice(0, 6), [allTools]
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Locaddo - Free Health & Finance Calculators",
    "url": "https://locaddo.com",
    "description": "Free online calculators for health, fitness, finance, and more. BMI calculator, mortgage calculator, calorie calculator, and other essential tools.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://locaddo.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Locaddo",
      "url": "https://locaddo.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-white text-black overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute w-96 h-96 bg-black/5 rounded-full blur-3xl transition-all duration-1000"
            style={{ left: mousePosition.x * 0.02 + "px", top: mousePosition.y * 0.02 + "px" }}
          />
        </div>

        {/* Header */}
        <header className="sticky top-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 z-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Locaddo</h1>
              </div>

              <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700" role="navigation" aria-label="Main navigation">
                <a href="#tools" className="hover:text-black transition-colors">Tools</a>
                <a href="#popular" className="hover:text-black transition-colors">Popular</a>
                <Link href="/tools" className="hover:text-black transition-colors">Browse All</Link>
              </nav>

              <Link href="/tools" className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium">
                Browse Tools
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative pt-24 pb-20 bg-gradient-to-br from-gray-50/50 to-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center relative z-10">
              <div className="inline-flex items-center px-6 py-3 bg-black/5 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                Free calculators for health and finance
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.95] tracking-tight">
                Free Health & Finance
                <span className="block bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
                  Calculators
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Accurate, fast, and completely free online calculators for health monitoring, 
                fitness planning, financial decisions, and everyday calculations. No signup required.
              </p>

              <div className="max-w-2xl mx-auto" role="search">
                <label htmlFor="calculator-search" className="sr-only">Search calculators</label>
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
                  <Search className="w-5 h-5 text-gray-500" aria-hidden="true" />
                  <input
                    id="calculator-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search calculators (e.g., BMI, Mortgage, Calorie)"
                    className="w-full outline-none py-3"
                    type="search"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-6" role="tablist" aria-label="Calculator categories">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                    activeCategory === "all" ? "bg-black text-white border-black" : "bg-white border-gray-200 hover:border-black"
                  }`}
                  role="tab"
                  aria-selected={activeCategory === "all"}
                >
                  All Calculators
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setActiveCategory(c.key)}
                    className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 transition-colors ${
                      activeCategory === c.key ? "bg-black text-white border-black" : "bg-white border-gray-200 hover:border-black"
                    }`}
                    role="tab"
                    aria-selected={activeCategory === c.key}
                  >
                    <span aria-hidden="true">{c.emoji}</span>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Tools */}
        <section id="popular" className="py-14 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold">Most Popular Calculators</h2>
              <Link href="/tools" className="text-sm text-gray-700 hover:text-black inline-flex items-center transition-colors">
                View all tools <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </div>
        </section>

        {/* Tool Categories */}
        <section id="tools" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {CATEGORIES.map((cat) => {
              const categoryTools = activeCategory === "all" || activeCategory === cat.key 
                ? (query ? filteredTools.filter(t => t.categoryKey === cat.key) : cat.tools.map(t => ({...t, href: `/tools/${cat.key}/${t.category}/${t.slug}`})))
                : [];

              if (activeCategory !== "all" && activeCategory !== cat.key) return null;

              return (
                <div key={cat.key} className="mb-16">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl" aria-hidden="true">{cat.emoji}</span>
                    <h2 className="text-2xl md:text-3xl font-bold">{cat.label}</h2>
                  </div>
                  <p className="text-gray-600 mb-6">{cat.description}</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryTools.map((t) => (
                      <ToolCard key={`${cat.key}-${t.slug}`} tool={t} />
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <Link 
                      href={`/tools/${cat.key}`}
                      className="inline-flex items-center px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
                    >
                      View All {cat.label} Tools
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-20 bg-gray-50" aria-labelledby="benefits-heading">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 id="benefits-heading" className="text-3xl font-bold text-center mb-12">Why Choose Our Calculators</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <ValueCard 
                icon={<Zap className="w-6 h-6" />} 
                title="Fast & Accurate" 
                text="Instant calculations with medically and mathematically accurate formulas." 
              />
              <ValueCard 
                icon={<Wand2 className="w-6 h-6" />} 
                title="Always Free" 
                text="No hidden fees, no subscriptions. All tools are completely free to use." 
              />
              <ValueCard 
                icon={<ShieldIcon />} 
                title="Privacy First" 
                text="All calculations run in your browser. We never store your personal data." 
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12" role="contentinfo">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold">Locaddo</span>
                </div>
                <p className="text-gray-400 max-w-md">
                  Free, accurate calculators for health, fitness, finance, and everyday decisions. 
                  Built with privacy and accuracy in mind.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Health Tools</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/tools/health/calculators/bmi-calculator" className="hover:text-white transition-colors">BMI Calculator</Link></li>
                  <li><Link href="/tools/health/calculators/calorie-calculator" className="hover:text-white transition-colors">Calorie Calculator</Link></li>
                  <li><Link href="/tools/health/women-health/pregnancy-due-date" className="hover:text-white transition-colors">Pregnancy Calculator</Link></li>
                  <li><Link href="/tools/health" className="hover:text-white transition-colors">View All Health Tools</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Finance Tools</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/tools/finance/calculators/mortgage-calculator" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
                  <li><Link href="/tools/finance/calculators/loan-calculator" className="hover:text-white transition-colors">Loan Calculator</Link></li>
                  <li><Link href="/tools/finance/planning/retirement-calculator" className="hover:text-white transition-colors">Retirement Calculator</Link></li>
                  <li><Link href="/tools/finance" className="hover:text-white transition-colors">View All Finance Tools</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                <p>&copy; {new Date().getFullYear()} Locaddo. All rights reserved.</p>
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// ---- UI Components ----
function ToolCard({ tool }) {
  return (
    <Link
      href={tool.href}
      className="group block bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
            {tool.icon}
          </div>
          <div>
            <h3 className="font-semibold leading-tight">{tool.name}</h3>
            <p className="text-sm text-gray-600 mt-0.5">{tool.blurb}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
      </div>
      {tool.popular && (
        <span className="inline-flex mt-4 items-center text-xs px-2 py-1 rounded-full bg-amber-100 border border-amber-200 text-amber-800">
          <TrendingUp className="w-3.5 h-3.5 mr-1" /> Popular
        </span>
      )}
    </Link>
  );
}

function ValueCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path d="M12 2l8 4v6c0 4.97-3.05 9.24-8 10-4.95-.76-8-5.03-8-10V6l8-4z" />
    </svg>
  );
}