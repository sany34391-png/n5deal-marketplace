
import type { UserRole } from "@/types/marketplace";

export interface CurrentUser {
  id: string;
  name: string;
  role: UserRole;
}

export const currentUser: CurrentUser = {
  id: "user-1",
  name: "Alexander Borodin",
  role: "buyer",
};

export function isBuyer(user: CurrentUser) {
  return user.role === "buyer";
}

export function isSeller(user: CurrentUser) {
  return user.role === "seller";
}

export function isManager(user: CurrentUser) {
  return user.role === "manager";
}
