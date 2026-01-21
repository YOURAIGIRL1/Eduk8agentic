
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene } from './components/QuantumScene';
import { ComparisonTable, PathCard, FeatureCard } from './components/LandingComponents';
import { ArrowRight, CheckCircle2, Mail, Menu, X, ChevronRight, BrainCircuit, Rocket, Target, ShieldAlert, Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFooter = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById('footer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 selection:bg-purple-600 selection:text-white font-sans">
      
      {/* Navigation - Optimized for SEO/UX */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">8</div>
            <span className="font-serif font-bold text-xl tracking-tight text-stone-900">
              EDUK8<span className="text-purple-600">AGENTIC</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase">
            <a href="#problem" onClick={scrollToSection('problem')} className="hover:text-purple-600 transition-colors">The Problem</a>
            <a href="#paths" onClick={scrollToSection('paths')} className="hover:text-purple-600 transition-colors">Solutions</a>
            <a 
              href="#footer" 
              onClick={scrollToFooter}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all shadow-md hover:shadow-purple-200"
            >
              Book Strategy Call
            </a>
          </div>

          <button className="md:hidden text-stone-900" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-2xl font-serif animate-fade-in px-6">
            <a href="#problem" onClick={scrollToSection('problem')} className="hover:text-purple-600 uppercase">The Problem</a>
            <a href="#paths" onClick={scrollToSection('paths')} className="hover:text-purple-600 uppercase">Solutions</a>
            <a href="#footer" onClick={scrollToFooter} className="px-8 py-4 bg-purple-600 text-white rounded-full shadow-xl">Book Free Call</a>
        </div>
      )}

      {/* Hero Section - Semantic H1 for SEO */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <HeroScene />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,rgba(109,40,217,0.05)_0%,transparent_70%)]" />
        
        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6 px-4 py-1.5 bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold tracking-[0.2em] uppercase rounded-full"
          >
            For CEOs, Founders & Senior Leaders
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 text-stone-900"
          >
            The Leadership Multiplier: <br/>
            <span className="text-purple-600 italic">Lead with Agentic AI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-stone-600 font-light leading-relaxed mb-12"
          >
            Build and deploy Agentic AI systems that monitor, analyze, prepare, and alert — autonomously. Wake up to insights instead of inboxes.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
             <button onClick={scrollToFooter} className="w-full sm:w-auto px-10 py-5 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-all shadow-xl hover:shadow-purple-200 flex items-center justify-center gap-2 group">
                Build It Yourself <ArrowRight className="group-hover:translate-x-1 transition-transform" />
             </button>
             <button onClick={scrollToFooter} className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-stone-200 text-stone-900 rounded-xl font-bold text-lg hover:border-purple-600 transition-all flex items-center justify-center gap-2 group">
                Have Us Build It <ChevronRight className="group-hover:translate-x-1 transition-transform" />
             </button>
          </motion.div>
        </div>
      </header>

      {/* Trusted By Section */}
      <section className="py-16 bg-white border-b border-stone-100">
        <div className="container mx-auto px-6">
          <p className="text-center text-stone-400 uppercase tracking-[0.3em] text-xs font-bold mb-10">
            Trusted by Leaders & Executives from
          </p>

          {/* Company Logos Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-16 items-center">
              {[
                { name: 'Deloitte', style: 'font-bold text-2xl' },
                { name: 'KPMG', style: 'font-black text-2xl tracking-wider' },
                { name: 'Barclays', style: 'font-bold text-2xl' },
                { name: 'Unilever', style: 'font-bold text-2xl' },
                { name: 'HSBC', style: 'font-black text-2xl tracking-wide' },
                { name: 'Accenture', style: 'font-bold text-2xl' },
                { name: 'PwC', style: 'font-black text-2xl' },
                { name: 'Lloyds', style: 'font-bold text-2xl' },
                { name: 'BP', style: 'font-black text-3xl' },
                { name: 'Shell', style: 'font-bold text-2xl' },
                { name: 'GSK', style: 'font-black text-2xl tracking-wider' },
                { name: 'AstraZeneca', style: 'font-bold text-xl' },
                // Duplicate for seamless loop
                { name: 'Deloitte', style: 'font-bold text-2xl' },
                { name: 'KPMG', style: 'font-black text-2xl tracking-wider' },
                { name: 'Barclays', style: 'font-bold text-2xl' },
                { name: 'Unilever', style: 'font-bold text-2xl' },
                { name: 'HSBC', style: 'font-black text-2xl tracking-wide' },
                { name: 'Accenture', style: 'font-bold text-2xl' },
              ].map((company, i) => (
                <span
                  key={i}
                  className={`${company.style} text-stone-300 hover:text-stone-500 transition-colors whitespace-nowrap`}
                >
                  {company.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-purple-600 uppercase tracking-[0.2em] text-xs font-bold mb-4">What Leaders Are Saying</p>
            <h2 className="font-serif text-4xl md:text-5xl text-stone-900">Transforming Executive Workflows</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-stone-600 leading-relaxed mb-6 italic">
                "The Agentic AI training completely transformed how I approach strategic decisions. I now have systems that monitor market shifts and prepare briefings before I even ask. It's like having a brilliant analyst working 24/7."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg">
                  JM
                </div>
                <div>
                  <p className="font-bold text-stone-900">James Mitchell</p>
                  <p className="text-stone-500 text-sm">CEO, FinTech Solutions Ltd</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-shadow md:transform md:-translate-y-4"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-stone-600 leading-relaxed mb-6 italic">
                "As a non-technical founder, I was sceptical about building AI systems. EDUK8AGENTIC made it accessible. Within weeks, I had autonomous agents handling competitor analysis and client research. Game-changing."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-lg">
                  SP
                </div>
                <div>
                  <p className="font-bold text-stone-900">Sarah Pemberton</p>
                  <p className="text-stone-500 text-sm">Founder & MD, Pemberton Advisory</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-stone-600 leading-relaxed mb-6 italic">
                "We brought EDUK8AGENTIC in to train our senior leadership team. The ROI was immediate — our executives now understand AI at a strategic level and we've deployed three autonomous systems across the organisation."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  RK
                </div>
                <div>
                  <p className="font-bold text-stone-900">Richard Khalil</p>
                  <p className="text-stone-500 text-sm">COO, Enterprise Holdings Group</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <main>
        {/* The Problem Section */}
        <section id="problem" className="py-32 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5">
                <div className="text-red-500 font-bold tracking-widest text-sm uppercase mb-4 flex items-center gap-2">
                  <ShieldAlert size={20} /> The Executive Hard Truth
                </div>
                <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight text-stone-900">Why Most Leaders Fail to Leverage Agentic AI</h2>
                <div className="space-y-4">
                  {[
                    "Spending 2+ hours every day catching up manually",
                    "Competitors moving at speed with automated research",
                    "Basic ChatGPT prompting hasn't saved meaningful time",
                    "Decisions still made with incomplete data analysis",
                    "Reacting to market shifts instead of predicting them",
                    "The bottleneck of manual information processing"
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-stone-50 rounded-lg border-l-4 border-red-400">
                      <X className="text-red-500 mt-1 flex-shrink-0" size={18} />
                      <p className="text-stone-700 font-medium">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col justify-center bg-stone-900 rounded-3xl p-10 text-white shadow-2xl">
                <p className="text-xl md:text-2xl font-light italic leading-relaxed text-stone-300">
                  "Leading in 2025 requires Agentic AI systems that work FOR you — analyzing, monitoring, and preparing — while you sleep."
                </p>
                <div className="mt-8 border-t border-white/10 pt-8 text-stone-400 leading-relaxed">
                  Most executives are still treating AI like a chatbot. They ask questions one at a time.
                  <br/><br/>
                  <strong className="text-red-400 font-bold uppercase tracking-widest">That's not Agentic AI. That's just a faster way to do the same manual work.</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiator Section */}
        <section className="py-24 bg-stone-50 overflow-hidden">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
               <h2 className="font-serif text-4xl md:text-5xl mb-4">Chatbots vs. Agentic AI Systems</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm">
                <div className="text-red-600 font-bold uppercase text-xs mb-4">Prompt Engineering</div>
                <h3 className="text-xl font-bold mb-4">Basic AI Courses</h3>
                <p className="text-stone-600 leading-relaxed">
                  Most training focuses on prompt engineering. You're still the operator. You prompt, it answers. You're still doing the information heavy lifting.
                </p>
                <div className="mt-6 font-bold text-red-600 italic">Not a multiplier. Just a better search engine.</div>
              </div>
              <div className="bg-purple-900 p-8 rounded-2xl border border-purple-800 text-white shadow-xl transform md:scale-105">
                <div className="text-purple-300 font-bold uppercase text-xs mb-4">Autonomous Execution</div>
                <h3 className="text-xl font-bold mb-4">Agentic AI Multipliers</h3>
                <p className="text-purple-100 leading-relaxed">
                  Agentic AI systems operate independently. They monitor markets, prepare briefings, and flag crises 24/7 without your intervention.
                </p>
                <div className="mt-6 font-bold text-purple-300 italic">This is the true Leadership Multiplier.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Path Cards */}
        <section id="paths" className="py-32 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <header className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-6xl mb-6">Choose Your Path to Agentic Mastery</h2>
              <p className="text-stone-500 text-xl font-light">Two expert paths to the same autonomous destination.</p>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <PathCard 
                 title="Build It Yourself"
                 subtitle="Guided Agentic AI Training"
                 description="Learn to architect your own Agentic AI systems with executive-level training. Leave with functional prototypes you control."
                 points={[
                   "Truly understand the 'brain' of your Agentic systems",
                   "Full control over data security and deployment",
                   "Skills that compound as the technology evolves",
                   "Designed for the non-technical senior leader"
                 ]}
                 cta="Apply for Training →"
                 onCtaClick={scrollToFooter}
                 footer="Curriculum: Hands-on system architecture + 1:1 support"
                 variant="purple"
               />
               <PathCard 
                 title="Done-With-You"
                 subtitle="Agentic AI Consultancy"
                 description="We architect and deploy your Leadership Multiplier for you. Custom systems tailored to your specific organizational needs."
                 points={[
                   "Immediate results without the learning curve",
                   "Enterprise-grade implementation and security",
                   "Tailored to complex, high-stakes requirements",
                   "Includes ongoing support and team optimization"
                 ]}
                 cta="Request Consultation →"
                 onCtaClick={scrollToFooter}
                 footer="Includes: Strategic audit + deployment + training"
                 variant="emerald"
               />
            </div>

            <div className="mt-20 text-center">
              <p className="text-stone-500 text-lg mb-4">Need help deciding? Contact our advisors.</p>
              <button onClick={scrollToFooter} className="text-purple-600 font-bold text-2xl hover:underline flex items-center justify-center gap-2 mx-auto">
                Book Your Strategy Session <ArrowRight />
              </button>
            </div>
          </div>
        </section>

        {/* Blog / Resources Section */}
        <section id="blog" className="py-32 bg-stone-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-purple-600 uppercase tracking-[0.2em] text-xs font-bold mb-4">Resources & Insights</p>
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900">AI Leadership Insights</h2>
              <p className="text-stone-500 text-lg max-w-2xl mx-auto">Practical guides for executives navigating the AI transformation</p>
            </div>

            {/* Featured Article - Full Width */}
            <a href="/blog/executive-ai-training/ai-training-for-executives-complete-guide-2025" className="block mb-12">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer md:flex"
              >
                <div className="md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
                  <BrainCircuit size={96} className="text-white/80" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <p className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-2">Featured • Executive AI Training</p>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-4 group-hover:text-purple-600 transition-colors">
                    AI Training for Executives: The Complete Guide for Non-Technical Leaders in 2025
                  </h3>
                  <p className="text-stone-500 leading-relaxed mb-6">
                    The definitive guide for CEOs, C-suite executives, and senior leaders who want to understand and leverage AI agents without technical expertise. Learn the strategic frameworks that separate AI-literate leaders from those falling behind.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-stone-400 mb-4">
                    <span>18 min read</span>
                    <span>•</span>
                    <span>21 Jan 2025</span>
                  </div>
                  <div className="flex items-center text-purple-600 font-semibold">
                    Read Full Article <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            </a>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Article 1 */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
                  <BrainCircuit size={64} className="text-white/80" />
                </div>
                <div className="p-6">
                  <p className="text-stone-600 text-xs font-bold uppercase tracking-wider mb-2">Coming Soon</p>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
                    What Are AI Agents? A Non-Technical Executive's Guide
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4">
                    Understand AI agents without the jargon. Learn how autonomous AI systems differ from chatbots and why they matter for business leadership.
                  </p>
                  <div className="flex items-center text-stone-400 font-semibold text-sm">
                    Coming Soon
                  </div>
                </div>
              </motion.article>

              {/* Article 2 */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
                  <Rocket size={64} className="text-white/80" />
                </div>
                <div className="p-6">
                  <p className="text-stone-600 text-xs font-bold uppercase tracking-wider mb-2">Coming Soon</p>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
                    How to Build AI Agents Without Coding: CEO's Playbook
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4">
                    A step-by-step framework for non-technical leaders to deploy AI agents. No programming required — just strategic thinking.
                  </p>
                  <div className="flex items-center text-stone-400 font-semibold text-sm">
                    Coming Soon
                  </div>
                </div>
              </motion.article>

              {/* Article 3 */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center">
                  <Target size={64} className="text-white/80" />
                </div>
                <div className="p-6">
                  <p className="text-stone-600 text-xs font-bold uppercase tracking-wider mb-2">Coming Soon</p>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
                    AI Strategy for Business Leaders: ROI Framework
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-4">
                    How to evaluate AI investments and measure returns. Strategic frameworks for executive decision-making in AI transformation.
                  </p>
                  <div className="flex items-center text-stone-400 font-semibold text-sm">
                    Coming Soon
                  </div>
                </div>
              </motion.article>
            </div>

            {/* View All Blog CTA */}
            <div className="mt-12 text-center">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-colors"
              >
                View All Articles <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Transformation Table */}
        <section className="py-32 bg-white border-t border-stone-100">
           <div className="container mx-auto px-6 max-w-5xl">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900">The Agentic Transformation</h2>
                <p className="text-stone-500">How Agentic AI changes the executive workflow.</p>
              </div>
              <ComparisonTable />
           </div>
        </section>
      </main>

      {/* Footer / Contact - SEO Optimized Email Block */}
      <footer id="footer" className="bg-[#F5F4F0] py-32 border-t border-stone-200">
        <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-xl mx-auto mb-8">8</div>
            <h2 className="font-serif text-5xl md:text-6xl mb-8">Lead with the Multiplier.</h2>
            <p className="text-stone-600 text-xl mb-12">Leaders embracing Agentic AI systems will outpace the competition. Join the top 1% of autonomous executives.</p>
            
            <div className="bg-white p-10 rounded-3xl shadow-2xl border-2 border-purple-500 flex flex-col items-center transform scale-105">
               <p className="text-purple-600 uppercase tracking-widest font-black mb-4">Inquiry for Training or Consultancy</p>
               <a href="mailto:learn@educ8agentic.com" className="text-3xl md:text-5xl font-serif font-bold text-stone-900 hover:text-purple-700 transition-colors break-all underline decoration-purple-500 decoration-4 underline-offset-8">
                 learn@educ8agentic.com
               </a>
               <p className="mt-8 text-stone-500 max-w-md">Reach out to determine the best path for your leadership goals.</p>
            </div>
            
            <div className="mt-20 flex flex-col items-center gap-4 text-stone-400">
                <p className="font-bold text-stone-900 uppercase tracking-tight">www.eduk8agentic.com</p>
                <p className="text-sm">Agentic AI Education for Non-Technical Executives & Leaders</p>
                <p className="text-xs mt-4">© 2025 EDUK8AGENTIC. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
