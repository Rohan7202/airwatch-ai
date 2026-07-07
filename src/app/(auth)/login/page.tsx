import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/forms/login-form";
import { Card } from "@/components/ui/card";
import { PageTransition } from "@/components/ui/page-transition";

export default function LoginPage() {
  return (
    <PageTransition>
      <Card className="w-full max-w-md p-7">
        <div className="mb-6 flex items-start gap-3">
          <div className="rounded-xl bg-sky-100 p-2 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Sign in to monitor neighborhood air quality operations.</p>
          </div>
        </div>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
          New to AirWatch?{" "}
          <Link href="/register" className="font-medium text-sky-600 hover:underline dark:text-sky-300">
            Create account
          </Link>
        </p>
      </Card>
    </PageTransition>
  );
}
