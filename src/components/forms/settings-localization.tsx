"use client";

import { useState } from "react";
import { Select } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useProfile, useUpdateProfile } from "@/features/users/hooks/use-profile";

export function SettingsLocalization() {
  const profile = useProfile();
  const updateProfile = useUpdateProfile();
  const { pushToast } = useToast();

  const [timezone, setTimezone] = useState("pt");

  const language = profile.data?.language ?? "en";
  const themePreference = profile.data?.theme ?? "system";

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Select
        label="Language"
        value={language}
        onChange={async (value) => {
          await updateProfile.mutateAsync({ language: value });
          pushToast("Language updated", "Workspace language preference has been changed.");
        }}
        options={[
          { value: "en", label: "English (US)" },
          { value: "es", label: "Español" },
          { value: "pt", label: "Português" },
        ]}
      />
      <Select
        label="Timezone"
        value={timezone}
        onChange={(value) => {
          setTimezone(value);
          pushToast("Timezone updated", "Regional schedule settings have been updated.");
        }}
        options={[
          { value: "pt", label: "Pacific Time (PT)" },
          { value: "ct", label: "Central Time (CT)" },
          { value: "et", label: "Eastern Time (ET)" },
        ]}
      />
      <Select
        label="Theme preference"
        value={themePreference}
        onChange={async (value) => {
          await updateProfile.mutateAsync({ theme: value as "light" | "dark" | "system" });
          pushToast("Theme preference saved", "Your workspace appearance preference was updated.");
        }}
        options={[
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
          { value: "system", label: "System" },
        ]}
      />
    </div>
  );
}
