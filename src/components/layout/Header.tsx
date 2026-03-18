"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "হোম", href: "/" },
  { label: "কোর্সসমূহ", href: "#courses" },
  { label: "ফ্রি এক্সাম", href: "#free-exams" },
  { label: "সফলতা", href: "#success" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-1.5">
                <div className="w-6 h-6 bg-background rounded-sm rotate-45 flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary -rotate-45" />
                </div>
              </div>
              <span className="font-black text-2xl tracking-tighter text-foreground">
                Examify
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="font-bold">
                <Link href="/login">লগইন</Link>
              </Button>
              <Button asChild size="sm" className="font-bold rounded-full px-6">
                <Link href="/register">নিবন্ধন করুন</Link>
              </Button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <Button asChild variant="outline" className="w-full justify-start gap-2">
                    <Link href="/login">
                      <LogIn className="h-4 w-4" />
                      লগইন
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/register">নিবন্ধন করুন</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
