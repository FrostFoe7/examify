"use client";

import React from "react";
import { Heart, Globe, Target, Sparkles } from "lucide-react";
import type { AboutHeroProps } from "@/types/global";

export function AboutHero({ title, description }: AboutHeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b bg-muted/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(var(--primary-rgb),0.1),transparent_70%)] opacity-20"></div>
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-success/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Heart className="h-3.5 w-3.5 fill-current" />
          আমাদের গল্প
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 text-foreground leading-[1.1]">
          {title}
        </h1>
        
        <p className="max-w-3xl mx-auto text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100 italic">
          &quot;{description}&quot;
        </p>

        {/* Dynamic Stats for About */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-in fade-in zoom-in duration-700 delay-300">
          {[
            { label: "মিশন", title: "শিক্ষা সবার জন্য", icon: Target, color: "text-info" },
            { label: "ভিশন", title: "প্রযুক্তি নির্ভর শিক্ষা", icon: Globe, color: "text-success" },
            { label: "মূল্যবোধ", title: "সততা ও মানসম্মত সেবা", icon: Sparkles, color: "text-warning" },
          ].map((stat, i) => (
            <div key={i} className="group relative p-8 rounded-[2.5rem] bg-card border border-border transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
              <div className="mb-6 w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-sm">
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <div className="text-lg font-black text-foreground mb-1">{stat.title}</div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
