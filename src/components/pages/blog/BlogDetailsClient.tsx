"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogHeader } from "./BlogHeader";
import { BlogContent } from "./BlogContent";

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  category_name?: string;
  author_name?: string;
  created_at: string;
}

interface BlogDetailsClientProps {
  blog: Blog;
}

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
