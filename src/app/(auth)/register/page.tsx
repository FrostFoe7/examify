import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { RegisterForm } from "@/components/pages/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-muted/30"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}