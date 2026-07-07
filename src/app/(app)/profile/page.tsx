import { Activity, Bell, MapPin } from "lucide-react";
import { ProfileForm } from "@/components/forms/profile-form";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { PageTransition } from "@/components/ui/page-transition";

const quickStats = [
  { label: "Reports submitted", value: "37", icon: Activity },
  { label: "Alerts received", value: "214", icon: Bell },
  { label: "Zones monitored", value: "6", icon: MapPin },
];

const activity = [
  { title: "Submitted report: Industrial plume near C4", time: "2h ago" },
  { title: "Received advisory: East Loop AQI alert", time: "5h ago" },
  { title: "Updated notification preferences", time: "1d ago" },
];

export default function ProfilePage() {
  return (
    <PageTransition>
      <section className="space-y-6">
        <PageHeader
          badge="Account"
          title="Profile"
          description="Manage your identity, regional assignment, and profile details used for operational notifications."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="flex flex-col items-center p-6 lg:col-span-1">
            <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 text-3xl font-bold text-white shadow-lg shadow-sky-500/30">
              AM
            </div>
            <h3 className="mt-4 text-center text-lg font-semibold">Avery Morgan</h3>
            <p className="text-center text-sm text-slate-600 dark:text-slate-300">Municipal Officer · District 4</p>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/60 bg-white/70 px-3 py-2 text-sm font-medium transition hover:bg-white dark:border-slate-700/60 dark:bg-slate-900/70">
              Update avatar
            </button>
          </Card>

          <div className="space-y-4 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
              {quickStats.map((stat) => (
                <Card key={stat.label} className="p-5">
                  <div className="mb-2 inline-flex rounded-xl bg-sky-100 p-2 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                    <stat.icon className="size-4" />
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                </Card>
              ))}
            </div>
            <ProfileForm />
          </div>
        </div>

        <Card className="p-6">
          <h3 className="mb-4 text-base font-semibold">Recent activity</h3>
          <div className="space-y-3">
            {activity.map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-xl bg-white/60 px-4 py-3 text-sm dark:bg-slate-900/50">
                <span className="font-medium">{item.title}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </PageTransition>
  );
}
