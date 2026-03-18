"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { cn, maskRollNumber } from "@/lib/utils";
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarFallback,
} from "@/components/ui";
import { ThemeToggle } from "@/components/shared";
import { useAuthStore } from "@/store/useAuthStore";

const navLinks = [
  { label: "হোম", href: "/" },
  { label: "কোর্সসমূহ", href: "#courses" },
  { label: "ফ্রি এক্সাম", href: "#free-exams" },
  { label: "সফলতা", href: "#success" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { user, clearAuth } = useAuthStore();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';


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
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-primary transition-colors",
                    pathname === link.href && "text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle /> {/* Theme Toggle component */}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {maskRollNumber(user.roll_number)}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>ড্যাশবোর্ড</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => clearAuth()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>লগ আউট</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="font-bold">
                  <Link href="/login">লগইন</Link>
                </Button>
                <Button asChild size="sm" className="font-bold rounded-full px-6">
                  <Link href="/register">নিবন্ধন করুন</Link>
                </Button>
              </div>
            )}

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
                      className={cn(
                        "text-lg font-semibold hover:text-primary transition-colors",
                        pathname === link.href && "text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  {user ? (
                    <>
                      <Button asChild variant="outline" className="w-full justify-start gap-2">
                        <Link href="/dashboard">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>ড্যাশবোর্ড</span>
                        </Link>
                      </Button>
                      <Button onClick={() => clearAuth()} className="w-full justify-start gap-2">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>লগ আউট</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline" className="w-full justify-start gap-2">
                        <Link href="/login">
                          <LogIn className="h-4 w-4" />
                          লগইন
                        </Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href="/register">নিবন্ধন করুন</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
