import { adminAuth } from "@/lib/firebase/admin";
import { firestoreRepository } from "@/server/repositories/firestore-repository";

export const authService = {
  async ensureUserFromToken(idToken: string) {
    const decoded = await adminAuth.verifyIdToken(idToken, true);

    const user = await firestoreRepository.upsertUser({
      uid: decoded.uid,
      email: decoded.email ?? "unknown@example.com",
      fullName: (decoded.name as string | undefined) ?? decoded.email?.split("@")[0] ?? "AirWatch User",
      emailVerified: decoded.email_verified ?? false,
    });

    return { user, decoded };
  },
};
