"use client";

import { useState } from "react";
import { Bell, Globe2, Lock, Palette, Shield } from "lucide-react";
import { SettingsLocalization } from "@/components/forms/settings-localization";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/hooks/use-toast";
import { useProfile, useUpdateProfile } from "@/features/users/hooks/use-profile";
import { PageTransition } from "@/components/ui/page-transition";

const notificationOptions = [
  { id: "critical", label: "Hotspot critical alerts", description: "Receive alerts when new high-risk hotspots are confirmed." },
  { id: "tasks", label: "Municipal task updates", description: "Get notified when assigned response tasks change status." },
  { id: "digest", label: "Weekly air quality digest", description: "A summary of neighborhood air quality each Monday." },
] as const;

const defaultPrefs = { critical: true, tasks: true, digest: false };

export default function SettingsPage() {
  const profile = useProfile();
  const updateProfile = useUpdateProfile();
  const { pushToast } = useToast();

  const [syncTheme, setSyncTheme] = useState(true);
  const prefs = profile.data?.notificationPreferences ?? defaultPrefs;

  const toggle = async (id: string) => {
    const nextPrefs = { ...prefs, [id]: !prefs[id as keyof typeof prefs] };

    try {
      await updateProfile.mutateAsync({
        notificationPreferences: {
          critical: Boolean(nextPrefs.critical),
          tasks: Boolean(nextPrefs.tasks),
          digest: Boolean(nextPrefs.digest),
        },
      });
      pushToast("Preference saved", "Your notification settings were updated.");
    } catch (error) {
      pushToast("Update failed", error instanceof Error ? error.message : "Unable to save preferences.");
    }
  };

  return (
    <PageTransition>
      <section className="space-y-6">
        <PageHeader
          badge="Workspace"
          title="Settings"
          description="Configure notifications, localization preferences, security controls, and environmental monitoring defaults."
        />

        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Bell className="size-5 text-sky-600 dark:text-sky-300" />
            <h3 className="text-base font-semibold">Notification preferences</h3>
          </div>
          <div className="space-y-4">
            {notificationOptions.map((option) => (
              <div key={option.id} className="flex items-center justify-between gap-4 rounded-xl bg-white/60 px-4 py-3 dark:bg-slate-900/50">
                <div>
                  <p className="text-sm font-medium">{option.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{option.description}</p>
                </div>
                <Toggle checked={prefs[option.id]} onChange={() => void toggle(option.id)} label={option.label} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Globe2 className="size-5 text-sky-600 dark:text-sky-300" />
            <h3 className="text-base font-semibold">Regional and language settings</h3>
          </div>
          <SettingsLocalization />
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <Palette className="size-5 text-sky-600 dark:text-sky-300" />
              <h3 className="text-base font-semibold">Appearance</h3>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/60 px-4 py-3 dark:bg-slate-900/50">
              <div>
                <p className="text-sm font-medium">Sync with system theme</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Automatically match light or dark mode.</p>
              </div>
              <Toggle checked={syncTheme} onChange={setSyncTheme} label="Sync with system theme" />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">You can also switch instantly from the theme button in the top navigation.</p>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="size-5 text-sky-600 dark:text-sky-300" />
              <h3 className="text-base font-semibold">Security controls</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Enable two-factor authentication</Button>
              <Button variant="secondary">Review active sessions</Button>
            </div>
          </Card>
        </div>

        <Card className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <Lock className="size-5 text-rose-600 dark:text-rose-300" />
            <div>
              <h3 className="text-base font-semibold">Danger zone</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Permanently delete your workspace data.</p>
            </div>
          </div>
          <Button variant="destructive">Delete data</Button>
        </Card>
      </section>
    </PageTransition>
  );
}
