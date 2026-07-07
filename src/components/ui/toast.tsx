"use client";

import { CheckCircle2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface ToastItem {
  id: string;
  title: string;
  description: string;
}

export function ToastViewport({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: string) => void }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[110] mx-auto flex w-full max-w-md flex-col gap-2 px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto glass rounded-xl p-3 shadow-xl"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 text-emerald-500" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{toast.title}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">{toast.description}</p>
              </div>
              <button type="button" className="rounded-md p-1 text-slate-500 hover:bg-white/70 dark:hover:bg-slate-800" onClick={() => onDismiss(toast.id)}>
                <X className="size-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
