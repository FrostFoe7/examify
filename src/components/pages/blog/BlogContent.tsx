"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";
import type { BlogContentProps } from "@/types/global";

export function BlogContent({ content }: BlogContentProps) {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-16 overflow-hidden">
        <div 
          className="blog-content text-left
            [&>h1]:text-3xl [&>h1]:md:text-4xl [&>h1]:font-black [&>h1]:mb-6 [&>h1]:mt-10 [&>h1]:tracking-tighter
            [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-black [&>h2]:mb-6 [&>h2]:mt-10 [&>h2]:tracking-tight
            [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-black [&>h3]:mb-4 [&>h3]:mt-8
            [&>p]:text-muted-foreground [&>p]:leading-[1.8] [&>p]:mb-6 [&>p]:text-lg [&>p]:font-medium
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul]:space-y-3
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol]:space-y-3
            [&>li]:text-muted-foreground [&>li]:text-lg [&>li]:font-medium
            [&>blockquote]:border-l-8 [&>blockquote]:border-primary [&>blockquote]:bg-primary/5 [&>blockquote]:p-8 [&>blockquote]:rounded-r-3xl [&>blockquote]:my-10 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:font-bold
            [&>img]:rounded-3xl [&>img]:border [&>img]:border-border [&>img]:my-10
            [&>a]:text-primary [&>a]:underline [&>a]:font-bold hover:[&>a]:opacity-80
            [&>strong]:text-foreground [&>strong]:font-black
            break-words whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Bottom Actions */}
        <div className="mt-20 pt-10 border-t border-border flex flex-col items-center justify-center gap-8">
           <div className="text-center space-y-2">
             <h4 className="text-2xl font-black text-foreground">পড়া শেষ?</h4>
             <p className="text-muted-foreground font-medium">এবার শুরু হোক আসল প্রস্তুতি। আমাদের লাইভ এক্সামগুলোতে অংশ নিন।</p>
           </div>
           
           <Button 
             size="lg"
             onClick={() => router.push('/')}
             className="h-16 px-12 bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 group"
           >
             এখনই প্রস্তুতি শুরু করুন
             <ArrowLeft className="ml-3 h-6 w-6 rotate-180 group-hover:translate-x-2 transition-transform" />
           </Button>
        </div>
      </div>
    </div>
  );
}
