"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Eye, EyeOff, Mail, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  organization: z.string().min(2, "Organization is required."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormValues = z.infer<typeof schema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { registerWithEmail, signInWithGoogle } = useAuth();
  const { pushToast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", organization: "", email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      setIsPending(true);
      await registerWithEmail(values.fullName, values.email, values.password);
      pushToast("Account created", "Please verify your email before continuing.");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      pushToast("Registration failed", error instanceof Error ? error.message : "Unable to create account.");
    } finally {
      setIsPending(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Full name</span>
        <div className="relative">
          <User2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Avery Morgan" className="pl-9" {...register("fullName")} />
        </div>
        {errors.fullName ? <p className="text-xs text-rose-600">{errors.fullName.message}</p> : null}
      </label>

      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Organization</span>
        <div className="relative">
          <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="City Air Response Unit" className="pl-9" {...register("organization")} />
        </div>
        {errors.organization ? <p className="text-xs text-rose-600">{errors.organization.message}</p> : null}
      </label>

      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Email</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="you@organization.gov" className="pl-9" {...register("email")} />
        </div>
        {errors.email ? <p className="text-xs text-rose-600">{errors.email.message}</p> : null}
      </label>

      <label className="block space-y-1.5">
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Password</span>
        <div className="relative">
          <Input type={showPassword ? "text" : "password"} placeholder="Create a strong password" className="pr-10" {...register("password")} />
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

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
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
