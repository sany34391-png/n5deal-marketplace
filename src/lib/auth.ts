import type { UserRole } from "@/types/marketplace";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export function getCurrentUser(): CurrentUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const savedUser = localStorage.getItem(
      "n5deal-current-user"
    );

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser) as CurrentUser;
  } catch {
    return null;
  }
}

export function isBuyer(
  user: CurrentUser | null
): boolean {
  return user?.role === "buyer";
}

export function isSeller(
  user: CurrentUser | null
): boolean {
  return user?.role === "seller";
}

export function isManager(
  user: CurrentUser | null
): boolean {
  return user?.role === "manager";
}