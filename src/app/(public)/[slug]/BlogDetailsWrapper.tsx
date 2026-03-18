"use client";

import React from "react";
import { notFound } from "next/navigation";
import { BlogDetailsClient } from "@/components/pages/blog";
import { useBlog } from "@/hooks/useQueries";
import { Skeleton } from "@/components/ui";
import { Header, Footer } from "@/components/layout";

// Wrapper component to handle data fetching and loading states
export default function BlogDetailsWrapper({ slug }: { slug: string }) {
  const { data: blog, isLoading, isError } = useBlog(slug);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
        <Header />
        <main className="flex-1">
          {/* Skeleton for Header */}
          <div className="relative w-full h-[50vh] md:h-[65vh] bg-muted overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
          {/* Skeleton for Title & Meta */}
          <div className="max-w-4xl mx-auto px-4 -mt-32 md:-mt-48 relative z-10">
            <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-16 pb-10 shadow-2xl shadow-primary/5 space-y-8">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-10 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-8 w-40" />
              </div>
            </div>
          </div>
          {/* Skeleton for Content */}
          <div className="max-w-4xl mx-auto px-4 py-20">
            <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-16 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-11/12" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-10/12" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center py-20 text-destructive">Error loading blog post.</div>;
  }

  if (!blog) {
    notFound(); // Next.js notFound helper for 404
  }

  return <BlogDetailsClient blog={blog} />;
}
