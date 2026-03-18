"use client";

import React from "react";
import { Header, Footer } from "@/components/layout";
import { BlogHeader, BlogContent } from "./index";
import type { BlogDetailsClientProps } from "@/types/global";

export function BlogDetailsClient({ blog }: BlogDetailsClientProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/10 selection:text-primary overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <BlogHeader blog={blog} />
        <BlogContent content={blog.content} />
      </main>
      <Footer />
    </div>
  );
}
