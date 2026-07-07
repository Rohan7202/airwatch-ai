import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/navigation/navbar";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { Sidebar } from "@/components/navigation/sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl">
        <Sidebar />
        <main id="main-content" className="w-full px-4 py-6 pb-24 md:px-6 lg:pb-8">{children}</main>
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
}
