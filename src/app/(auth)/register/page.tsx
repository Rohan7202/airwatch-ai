import Link from "next/link";
import { Sparkles } from "lucide-react";
import { RegisterForm } from "@/components/forms/register-form";
import { Card } from "@/components/ui/card";
import { PageTransition } from "@/components/ui/page-transition";

export default function RegisterPage() {
  return (
    <PageTransition>
      <Card className="w-full max-w-md p-7">
        <div className="mb-6 flex items-start gap-3">
          <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Create your workspace</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Set up your account to start monitoring and response coordination.</p>
          </div>
        </div>
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-sky-600 hover:underline dark:text-sky-300">
            Sign in
          </Link>
        </p>
      </Card>
    </PageTransition>
  );
}
