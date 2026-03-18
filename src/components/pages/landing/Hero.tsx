"use client";

import React from "react";
import Link from "next/link";
import { Zap, Users, BookOpen, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  stats: {
    usersCount: number;
    examsCount: number;
    batchesCount: number;
    questionsCount: number;
  };
}

export function Hero({ stats }: HeroProps) {
  const statItems = [
    { label: "সক্রিয় শিক্ষার্থী", value: `${stats.usersCount.toLocaleString("bn-BD")}+`, icon: Users, color: "text-info" },
    { label: "মোট পরীক্ষা", value: `${stats.examsCount.toLocaleString("bn-BD")}+`, icon: BookOpen, color: "text-success" },
    { label: "লাইভ ব্যাচ", value: `${stats.batchesCount.toLocaleString("bn-BD")}+`, icon: Zap, color: "text-warning" },
    { label: "মোট প্রশ্ন", value: `${stats.questionsCount.toLocaleString("bn-BD")}+`, icon: Trophy, color: "text-destructive" },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b bg-muted/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(var(--primary-rgb),0.1),transparent_70%)] opacity-20"></div>
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-info/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Zap className="h-3.5 w-3.5 fill-current" />
          শীর্ষস্থানীয় অনলাইন এডুকেশন প্ল্যাটফর্ম
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 text-foreground leading-[1.1]">
          সাফল্যের প্রস্তুতি হোক <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent">Examify</span> এর সাথে
        </h1>
        
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-10 duration-700 delay-100">
          আধুনিক প্রযুক্তি এবং অভিজ্ঞ মেন্টরদের সমন্বয়ে তৈরি আমাদের প্ল্যাটফর্মটি আপনাকে দেবে পরীক্ষার সেরা প্রস্তুতি। প্র্যাকটিস, পরীক্ষা এবং রিয়েল-টাইম অ্যানালাইসিস সব এক জায়গায়।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
          <Button asChild size="lg" className="h-14 md:h-16 px-8 md:px-10 rounded-2xl text-lg md:text-xl font-black bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:-translate-y-1 shadow-xl shadow-primary/20">
            <Link href="/register" className="flex items-center gap-2">
              এখনই শুরু করুন
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 md:h-16 px-8 md:px-10 rounded-2xl text-lg md:text-xl font-black border-2 border-primary/20 bg-card/50 backdrop-blur-sm hover:bg-primary/5 transition-all text-foreground">
            <Link href="#courses">ব্যাচগুলো দেখুন</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto animate-in fade-in zoom-in duration-700 delay-300">
          {statItems.map((stat, i) => (
            <div key={i} className="group relative p-6 rounded-3xl bg-card border border-border transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
              <div className={cn("mb-4 w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500")}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
              <div className="text-2xl md:text-3xl font-black text-foreground mb-1">{stat.value}</div>
              <div className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
