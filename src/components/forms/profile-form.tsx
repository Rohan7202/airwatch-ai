"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useProfile, useUpdateProfile, useUploadAvatar } from "@/features/users/hooks/use-profile";

const schema = z.object({
  fullName: z.string().min(2),
  language: z.string().min(2),
  theme: z.enum(["light", "dark", "system"]),
});

type FormValues = z.infer<typeof schema>;

export function ProfileForm() {
  const { user: authUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { pushToast } = useToast();

  const profileQuery = useProfile();
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploadAvatar();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      language: "en",
      theme: "system",
    },
  });

  useEffect(() => {
    if (profileQuery.data) {
      form.reset({
        fullName: profileQuery.data.fullName,
        language: profileQuery.data.language,
        theme: profileQuery.data.theme,
      });
    }
  }, [profileQuery.data, form]);

  const language = useWatch({ control: form.control, name: "language" }) ?? "en";
  const theme = useWatch({ control: form.control, name: "theme" }) ?? "system";

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await updateProfile.mutateAsync(values);
      pushToast("Profile updated", "Your profile changes have been saved.");
    } catch (error) {
      pushToast("Update failed", error instanceof Error ? error.message : "Unable to update profile.");
    }
  });

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-base font-semibold">Profile information</h3>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Full name" {...form.register("fullName")} />
          <Input disabled value={authUser?.email ?? ""} placeholder="Email" />

          <Select
            label="Language"
            value={language}
            onChange={(value) => form.setValue("language", value, { shouldValidate: true })}
            options={[
              { value: "en", label: "English" },
              { value: "es", label: "Español" },
              { value: "pt", label: "Português" },
            ]}
          />

          <Select
            label="Theme"
            value={theme}
            onChange={(value) => form.setValue("theme", value as "light" | "dark" | "system", { shouldValidate: true })}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "system", label: "System" },
            ]}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={updateProfile.isPending || profileQuery.isLoading}>
            {updateProfile.isPending ? "Saving..." : "Save profile"}
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file || !authUser) return;
              try {
                await uploadAvatar.mutateAsync({ uid: authUser.id, file });
                pushToast("Avatar updated", "Your new avatar was uploaded successfully.");
              } catch (error) {
                pushToast("Avatar upload failed", error instanceof Error ? error.message : "Unable to upload avatar.");
              }
            }}
          />

          <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()} disabled={uploadAvatar.isPending}>
            <Upload className="mr-2 size-4" />
            {uploadAvatar.isPending ? "Uploading..." : "Upload avatar"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
