"use client";

import React from "react";
import { CheckCircle2, Star, Rocket, Shield } from "lucide-react";

interface AboutSectionsProps {
  sections: Array<{
    title: string;
    content: string;
  }>;
}

const icons = [Rocket, Shield, Star];

export function AboutSections({ sections }: AboutSectionsProps) {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] translate-y-[-50%] translate-x-[50%]" />
      
      <div className="container relative mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              <Star className="h-3 w-3 fill-current" />
              আমাদের প্রতিশ্রুতি
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
              কেন আমরা <br /> <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">অদ্বিতীয়</span>
            </h2>
            <p className="text-muted-foreground font-medium md:text-lg max-w-xl">
              সেরা শিক্ষা ও প্রযুক্তি নিশ্চিত করতে আমরা প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={i} className="group relative p-10 rounded-[2.5rem] bg-card border border-border transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                <div className="mb-8 w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm">
                  <Icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-2xl font-black mb-4 text-foreground group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {section.content}
                </p>

                <div className="mt-8 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-primary/40 group-hover:text-primary transition-all duration-500">
                   <div className="h-px flex-1 bg-border group-hover:bg-primary/20 transition-all" />
                   <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
