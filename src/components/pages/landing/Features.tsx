import React from "react";
import { Zap, Rocket, Smartphone, PieChart, Star, Trophy, Target, Layout, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "লাইভ এক্সাম সিস্টেম",
    description: "রিয়েল-টাইম টাইমার এবং নেগেটিভ মার্কিংসহ একদম আসল পরীক্ষার অনুভূতি।",
    icon: Zap,
    color: "bg-warning/10 text-warning",
  },
  {
    title: "ডিটেইলড অ্যানালাইসিস",
    description: "প্রতিটি পরীক্ষার পর আপনার অবস্থান এবং ভুলগুলো বুঝতে গ্রাফিক্যাল রিপোর্ট।",
    icon: PieChart,
    color: "bg-info/10 text-info",
  },
  {
    title: "স্মার্ট ড্যাশবোর্ড",
    description: "আপনার সকল সাবজেক্ট এবং ব্যাচের আপডেট এক জায়গায় গুছিয়ে দেখা যাবে।",
    icon: Layout,
    color: "bg-accent text-accent-foreground",
  },
  {
    title: "মোবাইল ফ্রেন্ডলি",
    description: "যেকোনো স্মার্টফোন থেকে খুব সহজেই পরীক্ষা দেওয়া এবং কোর্স অ্যাক্সেস করা যাবে।",
    icon: Smartphone,
    color: "bg-success/10 text-success",
  },
  {
    title: "লিডারবোর্ড",
    description: "সব শিক্ষার্থীর মধ্যে আপনার পজিশন যাচাই করে প্রতিযোগিতায় টিকে থাকুন।",
    icon: Trophy,
    color: "bg-destructive/10 text-destructive",
  },
  {
    title: "প্র্যাকটিস মোড",
    description: "লাইভ এক্সাম শেষ হলেও যেকোনো সময় প্র্যাকটিস করার সুবিধা থাকবে।",
    icon: Target,
    color: "bg-info/10 text-info",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              <Star className="h-3 w-3 fill-current" />
              আমাদের বৈশিষ্ট্যসমূহ
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
              আমাদের সেরা <br /> <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">ফিচারসমূহ</span>
            </h2>
            <p className="text-muted-foreground font-medium md:text-lg max-w-xl">
              সেরা প্রস্তুতি নিশ্চিত করতে আমরা প্ল্যাটফর্মে যুক্ত করেছি আধুনিক সব প্রযুক্তি ও ফিচার।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group relative p-10 rounded-[2.5rem] bg-card border border-border transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
              <div className={cn("mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6", feature.color)}>
                <feature.icon className="h-8 w-8" />
              </div>
              
              <h3 className="text-2xl font-black mb-4 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                বিস্তারিত জানুন
                <Rocket className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-32 pt-16 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
           <div className="flex items-center gap-3 justify-center grayscale hover:grayscale-0 transition-all">
             <CheckCircle2 className="h-5 w-5 text-primary" />
             <span className="font-black text-xs uppercase tracking-widest">Certified Tutors</span>
           </div>
           <div className="flex items-center gap-3 justify-center grayscale hover:grayscale-0 transition-all">
             <CheckCircle2 className="h-5 w-5 text-primary" />
             <span className="font-black text-xs uppercase tracking-widest">Global Access</span>
           </div>
           <div className="flex items-center gap-3 justify-center grayscale hover:grayscale-0 transition-all">
             <CheckCircle2 className="h-5 w-5 text-primary" />
             <span className="font-black text-xs uppercase tracking-widest">Secured Payment</span>
           </div>
           <div className="flex items-center gap-3 justify-center grayscale hover:grayscale-0 transition-all">
             <CheckCircle2 className="h-5 w-5 text-primary" />
             <span className="font-black text-xs uppercase tracking-widest">24/7 Support</span>
           </div>
        </div>
      </div>
    </section>
  );
}
