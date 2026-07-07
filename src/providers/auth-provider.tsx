"use client";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { firebaseAuth, hasFirebaseClientConfig } from "@/lib/firebase/client";
import { apiFetch } from "@/lib/api/client";
import type { AppUser } from "@/types/domain";

interface AuthContextValue {
  user: AppUser | null;
  firebaseUser: User | null;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (fullName: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function syncServerSession(user: User) {
  const idToken = await user.getIdToken(true);
  return apiFetch<{ user: AppUser }>("/api/v1/auth/session", {
    method: "POST",
    body: JSON.stringify({ idToken }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!firebaseAuth || !hasFirebaseClientConfig) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onIdTokenChanged(firebaseAuth, async (nextUser) => {
      setFirebaseUser(nextUser);

      if (!nextUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        await syncServerSession(nextUser);
        const response = await apiFetch<{ user: AppUser | null }>("/api/v1/users/me");
        setUser(response.user);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      firebaseUser,
      isLoading,
      signInWithEmail: async (email, password) => {
        if (!firebaseAuth) throw new Error("Firebase client auth is not configured.");
        await signInWithEmailAndPassword(firebaseAuth, email, password);
      },
      registerWithEmail: async (fullName, email, password) => {
        if (!firebaseAuth) throw new Error("Firebase client auth is not configured.");
        const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        await updateProfile(credential.user, { displayName: fullName });
        await sendEmailVerification(credential.user);
        await syncServerSession(credential.user);
      },
      signInWithGoogle: async () => {
        if (!firebaseAuth) throw new Error("Firebase client auth is not configured.");
        const provider = new GoogleAuthProvider();
        const credential = await signInWithPopup(firebaseAuth, provider);
        await syncServerSession(credential.user);
      },
      sendPasswordReset: async (email) => {
        if (!firebaseAuth) throw new Error("Firebase client auth is not configured.");
        await sendPasswordResetEmail(firebaseAuth, email);
      },
      resendVerificationEmail: async () => {
        if (!firebaseAuth) throw new Error("Firebase client auth is not configured.");
        if (firebaseAuth.currentUser) {
          await sendEmailVerification(firebaseAuth.currentUser);
        }
      },
      signOut: async () => {
        if (firebaseAuth) {
          await firebaseSignOut(firebaseAuth);
        }
        await apiFetch<{ ok: boolean }>("/api/v1/auth/session", { method: "DELETE" });
        setUser(null);
      },
    }),
    [user, firebaseUser, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
