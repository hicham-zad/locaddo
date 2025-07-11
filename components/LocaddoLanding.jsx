"use client"

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  TrendingUp, 
  Globe, 
  BarChart3, 
  Zap, 
  Target,
  ArrowRight,
  Sparkles,
  MapPin,
  Newspaper,
  Brain,
  Wand2,
  Code,
  Calendar,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';

const LocaddoLanding = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', or ''
  const [message, setMessage] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubmitStatus('');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setMessage('🎉 You\'re on the list! Check your email for confirmation.');
        setEmail('');
        setName('');
      } else {
        setSubmitStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-black/3 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: mousePosition.x * 0.02 + 'px',
            top: mousePosition.y * 0.02 + 'px',
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </div>
              <span className="text-3xl font-bold tracking-tight">Locaddo</span>
            </div>
            <button  className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 font-medium">
           <a href="#waitlist" >      Get Notified</a>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center relative z-10">
            <div className="inline-flex items-center px-6 py-3 bg-black/5 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
              Coming Soon - Revolutionary SaaS Platform
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
              <span className="block">Every Local</span>
              <span className="block bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
                News Story
              </span>
              <span className="block text-5xl md:text-7xl font-light text-gray-600">
                Becomes Your Content
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-5xl mx-auto leading-relaxed">
              We're building the world's first AI platform that transforms local news into 
              <span className="font-semibold text-black"> SEO-optimized blog content </span>
              for law firms, medical practices, and real estate professionals - completely on autopilot.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <a href="#waitlist" className="group bg-black text-white px-10 py-5 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 flex items-center text-lg">
                Join the Waitlist
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Problem Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8">
                <div className="text-4xl font-black text-red-600 mb-2">87%</div>
                <div className="text-gray-700 font-medium">of local businesses struggle with consistent content creation</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8">
                <div className="text-4xl font-black text-red-600 mb-2">15hrs</div>
                <div className="text-gray-700 font-medium">average weekly time spent on content marketing</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8">
                <div className="text-4xl font-black text-red-600 mb-2">$3k</div>
                <div className="text-gray-700 font-medium">monthly cost for professional content creation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Idea */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">The Big Idea</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              What if every breaking news story in your city could automatically become a perfectly optimized blog post for your business?
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-100">Here's How It Works:</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <Newspaper className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3">1. AI Monitors Local News</h4>
                    <p className="text-gray-300 leading-relaxed">Our AI scans hundreds of local news sources in your area 24/7, identifying stories relevant to your industry and target audience.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3">2. Intelligent Content Transformation</h4>
                    <p className="text-gray-300 leading-relaxed">Advanced AI rewrites each story into engaging, SEO-optimized blog posts with local keywords that your potential clients are actually searching for.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3">3. Automatic Publishing</h4>
                    <p className="text-gray-300 leading-relaxed">Content automatically publishes to your WordPress site or integrates via API. Fresh, relevant content appears on your blog every day without lifting a finger.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 border border-gray-700">
              <h4 className="text-2xl font-bold mb-8 text-center">Integration Options</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                  {/* <Wordpress className="w-8 h-8 text-blue-400" /> */}
                  <div>
                    <div className="font-semibold">WordPress Direct Integration</div>
                    <div className="text-sm text-gray-400">Seamless connection to your WordPress site</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                  <Code className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="font-semibold">API Integration</div>
                    <div className="text-sm text-gray-400">Connect to any platform via our REST API</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                  <Calendar className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="font-semibold">Autopilot Publishing</div>
                    <div className="text-sm text-gray-400">Set schedule and forget - content flows automatically</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Why Local Professionals Need This</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Time Poverty</h3>
              <p className="text-gray-600 leading-relaxed">
                Law firms, medical practices, and real estate agents are drowning in client work. They know content marketing works but simply don't have 15+ hours per week to create it.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Cost Barrier</h3>
              <p className="text-gray-600 leading-relaxed">
                Hiring content agencies costs $3,000-$10,000+ monthly. Most local businesses can't justify this expense, leaving them behind in the digital race.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Local Relevance Gap</h3>
              <p className="text-gray-600 leading-relaxed">
                Generic content doesn't convert. Local businesses need hyper-relevant content that speaks to their community's current events and concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">The Market Opportunity</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              We're targeting a massive, underserved market that's desperately looking for a solution
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-black text-black mb-4">1.3M</div>
              <div className="text-xl font-semibold mb-2">Law Firms in the US</div>
              <div className="text-gray-600">Average marketing budget: $15k/month</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-black mb-4">250K</div>
              <div className="text-xl font-semibold mb-2">Medical Practices</div>
              <div className="text-gray-600">Desperate for patient acquisition content</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-black mb-4">2M</div>
              <div className="text-xl font-semibold mb-2">Real Estate Agents</div>
              <div className="text-gray-600">Need local market authority content</div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-block bg-black text-white px-8 py-4 rounded-2xl">
              <div className="text-3xl font-bold">$47B</div>
              <div className="text-lg">Total Addressable Market</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="waitlist" className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Be the First to Know
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join our exclusive waitlist and be among the first to access Locaddo when we launch. 
            Early subscribers get special launch pricing and priority onboarding.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="max-w-lg mx-auto">
            <div className="space-y-4 mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-6 py-4 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2"></div>
                  Joining...
                </>
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </form>
          
          {/* Status Messages */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl ${
              submitStatus === 'success' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-200' 
                : 'bg-red-500/20 border border-red-500/30 text-red-200'
            }`}>
              {message}
            </div>
          )}
          
          <p className="text-gray-400 text-sm mt-6">
            No spam. Updates only when we have something important to share.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold">Locaddo</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              <p>&copy; 2025 Locaddo. The future of local content marketing.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LocaddoLanding;