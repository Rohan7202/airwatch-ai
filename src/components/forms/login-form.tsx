"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { signInWithEmail, signInWithGoogle, sendPasswordReset } = useAuth();
  const { pushToast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setIsPending(true);
      await signInWithEmail(values.email, values.password);
      pushToast("Welcome back", "Authentication successful.");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      pushToast("Sign in failed", error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsPending(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Email</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="you@company.com" className="pl-9" {...register("email")} />
        </div>
        {errors.email ? <p className="text-xs text-rose-600">{errors.email.message}</p> : null}
      </label>

      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Password</span>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-9 pr-10" {...register("password")} />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password ? <p className="text-xs text-rose-600">{errors.password.message}</p> : null}
      </label>

      <div className="flex items-center justify-between text-xs">
        <label className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <input type="checkbox" className="size-4 rounded border-slate-300" />
          Keep me signed in
        </label>
        <button
          type="button"
          className="text-sky-600 hover:underline dark:text-sky-300"
          onClick={async () => {
            const email = getValues("email");
            if (!email) {
              pushToast("Email required", "Enter your email address first.");
              return;
            }
            try {
              await sendPasswordReset(email);
              pushToast("Reset email sent", "Check your inbox for password reset instructions.");
            } catch (error) {
              pushToast("Reset failed", error instanceof Error ? error.message : "Unable to send reset email.");
            }
          }}
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign in"}
      </Button>

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        disabled={isPending}
        onClick={async () => {
          try {
            setIsPending(true);
            await signInWithGoogle();
            pushToast("Welcome", "Signed in with Google.");
            router.push("/dashboard");
            router.refresh();
          } catch (error) {
            pushToast("Google sign in failed", error instanceof Error ? error.message : "Unable to continue with Google.");
          } finally {
            setIsPending(false);
          }
        }}
      >
        Continue with Google
      </Button>
    </form>
  );
}
