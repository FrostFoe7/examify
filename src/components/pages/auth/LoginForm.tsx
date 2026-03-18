"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button, Input, Label, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { login } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore"; // Import useAuthStore

export function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const setAuth = useAuthStore((state) => state.setAuth); // Use setAuth from Zustand store
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await login({ identifier, password });
      
      if (res.status === "success") {
        setAuth(res.data.user, res.data.token); // Call setAuth from Zustand
        if (redirectTo) {
          window.location.href = redirectTo; // Perform client-side redirect
        } else {
          window.location.href = "/"; // Perform client-side redirect
        }
      } else {
        setError(res.message || "লগইন ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।");
      }
    } catch {
      setError("সার্ভারে সমস্যা হয়েছে। দয়া করে পরে চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-[420px] animate-in fade-in zoom-in duration-500">
        <Card className="border-none rounded-[2.5rem] bg-card overflow-hidden shadow-2xl shadow-primary/5">
          <CardHeader className="text-center pb-8 pt-12 px-8">
            <div className="flex justify-center mb-8">
              <Link href="/" className="group">
                <div className="h-16 w-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 bg-primary/10 border border-primary/20 p-3">
                   <div className="w-full h-full bg-primary rounded-lg flex items-center justify-center">
                      <ShieldCheck className="text-primary-foreground h-8 w-8" />
                   </div>
                </div>
              </Link>
            </div>
            <CardTitle className="text-3xl font-black tracking-tight text-foreground">
              স্বাগতম
            </CardTitle>
            <CardDescription className="text-muted-foreground font-medium mt-3 text-base">
              আপনার অ্যাকাউন্টে লগইন করতে তথ্য দিন
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">
                  রোল নম্বর / ফোন নম্বর
                </Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="আপনার রোল বা ফোন নম্বর"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value.trim())}
                  required
                  disabled={isLoading}
                  className="h-14 rounded-2xl border-border bg-muted/50 focus:bg-card focus:ring-primary focus:border-primary transition-all font-bold"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                    পাসওয়ার্ড
                  </Label>
                </div>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    required
                    disabled={isLoading}
                    className="h-14 rounded-2xl border-border bg-muted/50 focus:bg-card focus:ring-primary focus:border-primary transition-all pr-14 font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-destructive text-center">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 rounded-2xl font-black text-lg transition-all bg-primary hover:bg-primary/90 active:scale-95 shadow-xl shadow-primary/20"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>প্রসেসিং...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>লগইন করুন</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-border text-center">
              <p className="text-sm font-bold text-muted-foreground">
                অ্যাকাউন্ট নেই?{" "}
                <Link
                  href={`/register${searchParams.get("redirect") ? `?redirect=${searchParams.get("redirect")}` : ""}`}
                  className="text-primary hover:underline ml-1 font-black"
                >
                  নিবন্ধন করুন
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-[10px] font-black text-muted-foreground/30 mt-10 uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} EXAMIFY REBORN
        </p>
      </div>
    </div>
  );
}
