import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Clock, ArrowUpRight } from "lucide-react";

interface Batch {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  price: number;
  old_price: number;
  live_exams_count: number;
  lecture_notes_count: number;
  standard_exams_count: number;
  solve_sheets_count: number;
  is_public: boolean;
}

interface CourseSectionProps {
  batches: Batch[];
}

export function CourseSection({ batches }: CourseSectionProps) {
  return (
    <section id="courses" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container relative mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              <BookOpen className="h-3 w-3" />
              আমাদের কোর্সসমূহ
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
              আপনার স্বপ্নের লক্ষ্যে <br /> <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">আমাদের ব্যাচগুলো</span>
            </h2>
            <p className="text-muted-foreground font-medium md:text-lg max-w-xl">
              সেরা মেন্টরদের মাধ্যমে পরিচালিত আমাদের প্রতিটি ব্যাচ আপনাকে গড়ে তুলবে আত্মবিশ্বাসী ও দক্ষ।
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="rounded-2xl h-14 px-8 font-black border-2 border-primary/20 hover:bg-primary/5 hidden md:flex transition-all hover:scale-105 active:scale-95">
            <Link href="/courses">সবগুলো কোর্স দেখুন</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {batches.map((batch) => (
            <div key={batch.id} className="group relative flex flex-col bg-card rounded-[2.5rem] border border-border overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image 
                  src={batch.image_url || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800"} 
                  alt={batch.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <Badge className="absolute top-6 right-6 bg-background/90 backdrop-blur-md text-primary font-black px-4 py-1.5 rounded-full text-[10px] border-none shadow-xl">
                  {batch.is_public ? "ফ্রি কোর্স" : "প্রিমিয়াম কোর্স"}
                </Badge>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    {batch.live_exams_count + batch.standard_exams_count} Exams
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    Live Support
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-4 text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {batch.name}
                </h3>
                <p className="text-muted-foreground text-sm font-medium line-clamp-2 mb-8 leading-relaxed">
                  {batch.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-8 border-t border-border/50">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">কোর্স ফি</p>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-primary">৳{Number(batch.price).toLocaleString("bn-BD")}</span>
                      {Number(batch.old_price) > Number(batch.price) && (
                        <span className="text-sm font-bold text-muted-foreground line-through decoration-destructive/40">৳{Number(batch.old_price).toLocaleString("bn-BD")}</span>
                      )}
                    </div>
                  </div>
                  <Button asChild size="icon" className="h-14 w-14 rounded-2xl bg-primary hover:bg-primary/90 transition-all hover:scale-110 active:scale-95 shadow-lg shadow-primary/20">
                    <Link href={`/courses/${batch.slug}`}>
                      <ArrowUpRight className="h-6 w-6" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button asChild variant="outline" size="lg" className="w-full mt-12 rounded-2xl h-14 font-black border-2 border-primary/20 hover:bg-primary/5 md:hidden">
          <Link href="/courses">সবগুলো কোর্স দেখুন</Link>
        </Button>
      </div>
    </section>
  );
}
