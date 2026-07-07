import { firestoreRepository } from "@/server/repositories/firestore-repository";

export const notificationService = {
  async listForUser(userId: string, limit = 50) {
    const [items, unread] = await Promise.all([
      firestoreRepository.listNotifications(userId, limit),
      firestoreRepository.unreadNotificationCount(userId),
    ]);

    return { items, unread };
  },
};
