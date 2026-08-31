import type { UserRole } from "@/types/marketplace";

export interface CurrentUser {
  id: string;
  name: string;
  role: UserRole;
}

export const defaultUser: CurrentUser = {
  id: "user-1",
  name: "Alexander Borodin",
  role: "buyer",
};

export function getCurrentUser(): CurrentUser {
  if (typeof window === "undefined") {
    return defaultUser;
  }

  try {
    const savedUser = localStorage.getItem(
      "n5deal-current-user"
    );

    if (!savedUser) {
      return defaultUser;
    }

    return JSON.parse(savedUser) as CurrentUser;
  } catch {
    return defaultUser;
  }
}

export function isBuyer(user: CurrentUser) {
  return user.role === "buyer";
}

export function isSeller(user: CurrentUser) {
  return user.role === "seller";
}

export function isManager(user: CurrentUser) {
  return user.role === "manager";
}