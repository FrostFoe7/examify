import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/pages/landing/Hero";
import { CourseSection } from "@/components/pages/landing/CourseSection";
import { PublicArena } from "@/components/pages/landing/PublicArena";
import { Features } from "@/components/pages/landing/Features";
import { CTA } from "@/components/pages/landing/CTA";
import { getStats, getLiveBatches, getPublicExams } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const [stats, liveBatches, publicExams] = await Promise.all([
    getStats(),
    getLiveBatches(),
    getPublicExams(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-white">
      <Header />
      
      <main className="flex-grow">
        <Hero stats={stats} />
        <CourseSection batches={liveBatches} />
        <PublicArena exams={publicExams} />
        <Features />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
