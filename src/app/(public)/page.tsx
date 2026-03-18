"use client";

import React from "react";
import { Header, Footer } from "@/components/layout";
import { Hero, CourseSection, PublicArena, Features, CTA } from "@/components/pages/landing";
import { useStats, useLiveBatches, usePublicExams } from "@/hooks/useQueries";
import { Skeleton } from "@/components/ui";

// Client component for Hero section with loading state
function HeroSectionWithData() {
  const { data: stats, isLoading, isError } = useStats();

  if (isLoading) {
    return (
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b bg-muted/30">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <Skeleton className="h-20 w-3/4 mx-auto mb-8" />
          <Skeleton className="h-12 w-1/2 mx-auto mb-12" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Skeleton className="h-16 w-48 rounded-2xl" />
            <Skeleton className="h-16 w-48 rounded-2xl" />
          </div>
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-3xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !stats) {
    return <section className="py-24 text-center text-destructive">Failed to load hero section data.</section>;
  }

  return <Hero stats={stats} />;
}

// Client component for Course section with loading state
function CourseSectionWithData() {
  const { data: liveBatches, isLoading, isError } = useLiveBatches();

  if (isLoading) {
    return (
      <section id="courses" className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="container relative mx-auto px-4">
          <Skeleton className="h-10 w-96 mb-4" />
          <Skeleton className="h-8 w-2/3 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-[2.5rem]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !liveBatches) {
    return <section className="py-24 text-center text-destructive">Failed to load courses.</section>;
  }

  return <CourseSection batches={liveBatches} />;
}

// Client component for Public Arena section with loading state
function PublicArenaWithData() {
  const { data: publicExams, isLoading, isError } = usePublicExams();

  if (isLoading) {
    return (
      <section id="free-exams" className="py-24 md:py-32 border-t border-border bg-muted/20 relative">
        <div className="container relative mx-auto px-4 text-center space-y-4 mb-16">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-10 w-1/2 mx-auto" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-[2.5rem]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !publicExams) {
    return <section className="py-24 text-center text-destructive">Failed to load public exams.</section>;
  }

  return <PublicArena exams={publicExams} />;
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-white">
      <Header />
      
      <main className="flex-grow">
        <HeroSectionWithData />
        <CourseSectionWithData />
        <PublicArenaWithData />
        <Features />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}