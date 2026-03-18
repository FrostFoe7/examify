import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { LoginForm } from "@/components/pages/auth";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-muted/30"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
      <LoginForm />
    </Suspense>
  );
}