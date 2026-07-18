"use client";
import React from 'react';
import { Globe, Bot, Workflow, Rocket, Cog, ArrowUpRight } from 'lucide-react';

const SERVICES = [
  { icon: Bot, name: 'Predictive Modeling' },
  { icon: Workflow, name: 'End-to-End ML Pipelines' },
  { icon: Globe, name: 'Custom NLP Solutions' },
  { icon: Cog, name: 'Computer Vision Systems' },
  { icon: Rocket, name: 'LLM Integration & Tuning' },
];

export default function ServicesGrid({ isDarkMode, themeClasses }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {SERVICES.map((service) => {
        const Icon = service.icon;
        return (
          <div
            key={service.name}
            className={`rounded-[2rem] p-7 flex items-center gap-4 text-left transition-all hover:-translate-y-1 ${themeClasses.card}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Icon size={22} />
              </div>
              <h3 className={`text-base font-black leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{service.name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
