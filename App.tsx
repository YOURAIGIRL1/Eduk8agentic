
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene } from './components/QuantumScene';
import { ComparisonTable, PathCard, FeatureCard } from './components/LandingComponents';
import { ArrowRight, CheckCircle2, Mail, Menu, X, ChevronRight, BrainCircuit, Rocket, Target, ShieldAlert } from 'lucide-react';
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
                <p className="font-bold text-stone-900 uppercase tracking-tight">www.educ8agentic.com</p>
                <p className="text-sm">Agentic Practical Education for Non-Technical Executives & Leaders</p>
                <p className="text-[10px] mt-4 opacity-50 uppercase tracking-tighter">SEO & LLM Optimized Context Provider</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
