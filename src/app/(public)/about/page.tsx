import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/pages/about/AboutHero";
import { AboutSections } from "@/components/pages/about/AboutSections";
import { ContributorCard } from "@/components/pages/about/ContributorCard";
import { aboutData } from "@/lib/data";

export const metadata = {
  title: "আমাদের সম্পর্কে | Examify",
  description: "Reading Zone by Examify - বাংলাদেশের শীর্ষস্থানীয় অনলাইন পরীক্ষার প্ল্যাটফর্ম। আমাদের মিশন, ভিশন এবং আমাদের পেছনের মানুষগুলো সম্পর্কে জানুন।",
};

export default function AboutPage() {
  const { title, description, sections } = aboutData.aboutContent;
  const contributors = aboutData.contributorsList;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-white overflow-x-hidden">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <AboutHero title={title} description={description} />

        {/* Promise/About Sections */}
        <AboutSections sections={sections} />

        {/* Contributors Section */}
        <section className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
          <div className="container relative mx-auto px-4 z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 px-4">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                  আমাদের দল
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                  আমাদের পেছনের <br /> <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">মানুষগুলো</span>
                </h2>
                <p className="text-muted-foreground font-medium md:text-lg">
                  আমাদের প্ল্যাটফর্ম তৈরির প্রতিটি ধাপে যারা তাদের মেধা ও শ্রম দিয়ে কাজ করেছেন।
                </p>
              </div>
              <p className="text-muted-foreground/30 font-black uppercase text-[10px] tracking-[0.3em] hidden md:block">
                The minds behind Reading Zone by Examify
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {contributors.map((contributor, index) => (
                <div
                  key={contributor.name}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ContributorCard contributor={contributor} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA for About */}
        <section className="py-24 md:py-32 container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-[3rem] bg-card p-12 md:p-20 text-center border-4 border-dashed border-border relative group overflow-hidden">
             <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
             <div className="relative z-10 space-y-8">
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">আমাদের সাথে <span className="text-primary">যুক্ত</span> হোন</h3>
                <p className="text-muted-foreground font-medium text-lg max-w-2xl mx-auto">
                   আমাদের সাথে কোনো মতামত শেয়ার করতে বা কোনো প্রয়োজনে যোগাযোগ করতে পারেন। আমরা সবসময় আপনাদের পাশে আছি।
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                   <button className="h-16 px-12 rounded-2xl bg-primary text-primary-foreground text-xl font-black hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20">
                      যোগাযোগ করুন
                   </button>
                   <button className="h-16 px-12 rounded-2xl bg-muted/50 text-foreground text-xl font-black hover:bg-muted transition-all border-2 border-border">
                      বিস্তারিত জানুন
                   </button>
                </div>
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
