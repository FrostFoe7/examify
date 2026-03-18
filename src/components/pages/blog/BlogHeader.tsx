"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import type { BlogHeaderProps } from "@/types/global";

export function BlogHeader({ blog }: BlogHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative">
      {/* Banner Section */}
      <div className="relative w-full h-[50vh] md:h-[65vh] bg-muted overflow-hidden">
        {blog.image_url ? (
          <Image
            src={blog.image_url}
            alt={blog.title}
            fill
            priority
            className="object-cover opacity-60 transition-transform duration-1000"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-foreground">
            <BookOpen className="h-20 w-20 text-background/10" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-100" />
        
        <div className="absolute top-32 left-4 md:left-12 z-20">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="group h-11 px-5 bg-background/10 hover:bg-background backdrop-blur-md text-foreground hover:text-primary transition-all duration-300 border-foreground/20 hover:border-foreground font-black"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">ফিরে যান</span>
          </Button>
        </div>
      </div>

      {/* Title & Meta Card */}
      <div className="max-w-4xl mx-auto px-4 -mt-32 md:-mt-48 relative z-10">
        <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-16 pb-10 shadow-2xl shadow-primary/5">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Badge className="bg-primary/10 text-primary border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {blog.category_name || "Guideline"}
              </Badge>
              <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-black uppercase tracking-widest">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>৫ মিনিট পাঠ</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tighter">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-border mt-10">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <User className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">লিখেছেন</p>
                  <p className="text-base font-black text-foreground">{blog.author_name || "অ্যাডমিন"}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">প্রকাশিত হয়েছে</p>
                  <div className="flex items-center gap-2 text-sm font-black text-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    {format(new Date(blog.created_at), 'dd MMMM, yyyy', { locale: bn })}
                  </div>
                </div>
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-border bg-muted/50 hover:bg-card text-muted-foreground hover:text-primary transition-all hover:scale-110 active:scale-95 shadow-lg shadow-black/5">
                  <Share2 className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {blog.excerpt && (
              <div className="p-8 md:p-10 bg-primary/5 rounded-[2rem] border-l-8 border-primary relative overflow-hidden group mt-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <p className="text-lg md:text-2xl text-foreground/80 font-bold leading-relaxed italic relative z-10 text-left">
                  &quot;{blog.excerpt}&quot;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
