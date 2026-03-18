import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Tag, ArrowRight, Zap } from "lucide-react";

interface Exam {
  id: string;
  name: string;
  batch_name: string;
  batch_slug: string;
  duration_minutes: number;
}

interface PublicArenaProps {
  exams: Exam[];
}

export function PublicArena({ exams }: PublicArenaProps) {
  return (
    <section id="free-exams" className="py-24 md:py-32 border-t border-border bg-muted/20 relative">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-success/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
      <div className="container relative mx-auto px-4 z-10 text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-black uppercase tracking-widest mx-auto">
          <Trophy className="h-3 w-3" />
          সবার জন্য উন্মুক্ত
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">
          ফ্রি এক্সাম <span className="text-success underline underline-offset-8 decoration-success/20 decoration-8">এরিনা</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto font-medium md:text-lg">
          নিচের পরীক্ষাগুলোতে যে কেউ অংশগ্রহণ করতে পারবে। কোনো রেজিস্ট্রেশন ছাড়াই আজই নিজেকে যাচাই করে নিন।
        </p>
      </div>

      <div className="container relative mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam) => (
            <Link 
              key={exam.id} 
              href={`/exams/${exam.id}`}
              className="group relative block p-8 rounded-[2.5rem] bg-card border border-border transition-all duration-500 hover:-translate-y-2 overflow-hidden hover:border-success/30 hover:shadow-2xl hover:shadow-success/5"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-success/10 flex items-center justify-center text-success group-hover:bg-success group-hover:text-success-foreground transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <Zap className="h-7 w-7 fill-current" />
                </div>
                <Badge className="bg-success text-success-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-xl shadow-success/10">Active Now</Badge>
              </div>
              
              <h3 className="text-2xl font-black mb-3 text-foreground group-hover:text-success transition-colors line-clamp-1">
                {exam.name}
              </h3>
              <p className="text-muted-foreground font-medium line-clamp-2 mb-8 text-sm leading-relaxed">
                {exam.batch_name} এর অধীনে একটি গুরুত্বপূর্ণ পাবলিক পরীক্ষা।
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-success transition-colors">
                  <Clock className="h-4 w-4" />
                  {exam.duration_minutes} MINS
                </div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-success bg-success/10 px-3 py-1.5 rounded-xl border border-success/10">
                  <Tag className="h-3.5 w-3.5 fill-current" />
                  FREE
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {exams.length === 0 && (
          <div className="text-center py-24 bg-muted/30 rounded-[3rem] border-2 border-dashed border-border flex flex-col items-center justify-center gap-6">
            <div className="h-24 w-24 rounded-3xl bg-muted flex items-center justify-center text-muted-foreground/30 rotate-3">
              <Trophy className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground font-black text-xl">বর্তমানে কোনো পাবলিক পরীক্ষা নেই।</p>
              <p className="text-muted-foreground/60 text-sm font-medium">খুব শীঘ্রই নতুন ফ্রি এক্সাম যোগ করা হবে। আমাদের সাথেই থাকুন।</p>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-16">
          <Button asChild size="lg" className="h-16 px-12 rounded-2xl text-lg font-black bg-success hover:bg-success/90 text-success-foreground transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-success/20">
            <Link href="/free-exams" className="flex items-center gap-3">
              সবগুলো ফ্রি এক্সাম দেখুন
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
