import { NotificationsView } from "@/components/notifications/notifications-view";
import { PageHeader } from "@/components/layout/page-header";
import { PageTransition } from "@/components/ui/page-transition";

export default function NotificationsPage() {
  return (
    <PageTransition>
      <section className="space-y-6">
        <PageHeader
          badge="Alerts"
          title="Notification center"
          description="Stay updated on emerging pollution risks, AI-triggered advisories, and municipal response milestones."
        />
        <NotificationsView />
      </section>
    </PageTransition>
  );
}
