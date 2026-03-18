import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 translate-y-24" />
      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-primary p-12 md:p-20 text-center text-primary-foreground shadow-2xl shadow-primary/20 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-background/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-foreground/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
              সাফল্যের পথে এক ধাপ <br className="hidden md:block" /> এগিয়ে থাকুন আজই
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              হাজারো শিক্ষার্থীর সাথে যোগ দিন এবং আপনার পরীক্ষার প্রস্তুতিকে নিয়ে যান এক অনন্য উচ্চতায়। আমাদের প্ল্যাটফর্ম দিচ্ছে সেরা সব ফিচার।
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Button asChild size="lg" className="h-16 px-12 rounded-2xl bg-background text-primary text-xl font-black hover:bg-background/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-background/10">
                <Link href="/register">নিবন্ধন করুন</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-12 rounded-2xl bg-primary-foreground/10 text-primary-foreground text-xl font-black hover:bg-primary-foreground/20 transition-all border-2 border-white/20">
                <Link href="/free-exams">ফ্রি ট্রায়াল দিন</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
