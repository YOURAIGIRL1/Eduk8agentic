
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const comparisons = [
    { before: "2+ hours catching up every morning", after: "2-minute briefing on what actually matters" },
    { before: "Wait days for research and analysis", after: "Get results from Agentic AI in minutes" },
    { before: "React to competitor moves after the fact", after: "Autonomous alerts in real-time" },
    { before: "Weeks of board meeting prep", after: "Draft deck and Q&A ready in hours" },
    { before: "Decisions with incomplete information", after: "Agentic models analyze every angle first" },
    { before: "60+ hour weeks, still behind", after: "Focused exclusively on high-value strategy" },
    { before: "AI as a smarter Google search", after: "Agentic AI working for you 24/7" },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-stone-200 shadow-2xl bg-white" aria-label="Agentic AI Transformation Table">
      <div className="grid grid-cols-2 bg-stone-900 text-white font-bold uppercase tracking-widest text-sm">
        <div className="p-6 border-r border-white/10 text-center">Manual Leadership</div>
        <div className="p-6 text-center">Agentic AI Multiplier</div>
      </div>
      {comparisons.map((item, idx) => (
        <div key={idx} className={`grid grid-cols-2 border-b border-stone-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}`}>
          <div className="p-6 md:p-8 border-r border-stone-100 text-stone-500 font-medium">
            {item.before}
          </div>
          <div className="p-6 md:p-8 text-purple-700 font-bold flex items-center gap-3">
             <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
               <Check size={12} className="text-purple-700" />
             </div>
             {item.after}
          </div>
        </div>
      ))}
    </div>
  );
};

interface PathCardProps {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  cta: string;
  onCtaClick?: () => void;
  footer: string;
  variant: 'purple' | 'emerald';
}

export const PathCard: React.FC<PathCardProps> = ({ title, subtitle, description, points, cta, onCtaClick, footer, variant }) => {
  const isPurple = variant === 'purple';
  
  return (
    <div className={`p-1 flex flex-col rounded-3xl h-full transition-transform hover:-translate-y-2 duration-300 ${isPurple ? 'bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200 shadow-purple-100' : 'bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-200 shadow-emerald-100'} shadow-xl`}>
       <div className="p-8 md:p-10 bg-white rounded-[1.4rem] flex-grow flex flex-col">
          <div className={`text-xs font-black uppercase tracking-widest mb-2 ${isPurple ? 'text-purple-600' : 'text-emerald-600'}`}>System Path {isPurple ? '1' : '2'}</div>
          <h3 className="text-3xl font-serif font-bold mb-1 text-stone-900">{title}</h3>
          <p className="text-stone-500 italic mb-6">({subtitle})</p>
          <p className="text-stone-600 mb-8 leading-relaxed">{description}</p>
          
          <div className="space-y-4 mb-10 flex-grow">
            <p className="font-bold text-stone-900 text-sm uppercase">Ideal For:</p>
            {points.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check size={18} className={isPurple ? 'text-purple-600' : 'text-emerald-600'} />
                <span className="text-stone-700 font-medium">{p}</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={onCtaClick}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all group ${isPurple ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-100 shadow-lg' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100 shadow-lg'}`}
          >
            {cta} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
       </div>
       <div className={`p-5 text-center text-xs font-bold italic tracking-wide uppercase ${isPurple ? 'text-purple-700' : 'text-emerald-700'}`}>
         {footer}
       </div>
    </div>
  );
};

export const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => {
  return (
    <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
      <div className="mb-6 p-3 bg-white/5 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300">
        {React.cloneElement(icon as React.ReactElement, { size: 32 })}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-stone-400 leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
};
