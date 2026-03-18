"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import type { ContributorCardProps, SocialLinks } from "@/types/global";
import { socialIcons } from "@/types/global";

export function ContributorCard({ contributor }: ContributorCardProps) {
  return (
    <div className="group relative bg-card p-8 rounded-[2.5rem] border border-border transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center h-full hover:shadow-2xl hover:shadow-primary/5">
      <div className="relative mb-8">
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-success/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
        <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background p-1 bg-background ring-2 ring-border group-hover:ring-primary/50 transition-all duration-500 shadow-xl shadow-black/5">
          <Image
            src={contributor.imageUrl}
            alt={contributor.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-black text-foreground tracking-tight">{contributor.name}</h3>
        <Badge className="font-black px-4 py-1 rounded-full text-[10px] uppercase tracking-widest bg-primary/10 text-primary border-none">
          {contributor.role}
        </Badge>
      </div>
      
      <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 line-clamp-3 italic">
        &quot;{contributor.bio}&quot;
      </p>
      
      <div className="flex gap-3 flex-wrap justify-center mt-auto pt-4 border-t border-border w-full">
        {Object.entries(contributor.social).map(([key, href]) => {
          const Icon = socialIcons[key as keyof SocialLinks];
          if (!Icon || !href || href === "#") return null;
          return (
            <Link key={key} href={href} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-accent/50 hover:bg-primary hover:text-white transition-all text-muted-foreground shadow-sm">
                <Icon className="h-4 w-4" />
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
