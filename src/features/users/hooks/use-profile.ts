"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { apiFetch } from "@/lib/api/client";
import { firebaseStorage } from "@/lib/firebase/client";
import type { UserDoc } from "@/types/firestore";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await apiFetch<{ user: UserDoc | null }>("/api/v1/users/me");
      return response.user;
    },
    staleTime: 20_000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (patch: Partial<UserDoc>) => {
      const response = await apiFetch<{ user: UserDoc }>("/api/v1/users/me", {
        method: "PATCH",
        body: JSON.stringify(patch),
        headers: { "Content-Type": "application/json" },
      });
      return response.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["profile"], user);
    },
  });
}

export function useUploadAvatar() {
  const updateProfile = useUpdateProfile();

  return useMutation({
    mutationFn: async ({ uid, file }: { uid: string; file: File }) => {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        throw new Error("Avatar must be a JPG, PNG, or WEBP image.");
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Avatar must be 5MB or smaller.");
      }

      if (!firebaseStorage) {
        throw new Error("Firebase storage is not configured.");
      }

      const path = `avatars/${uid}/${Date.now()}-${file.name}`;
      const storageRef = ref(firebaseStorage, path);
      await uploadBytes(storageRef, file, { contentType: file.type });
      const avatarUrl = await getDownloadURL(storageRef);
      await updateProfile.mutateAsync({ avatarUrl });
      return avatarUrl;
    },
  });
}
