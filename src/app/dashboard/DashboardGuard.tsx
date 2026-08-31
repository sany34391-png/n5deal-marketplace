
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  getCurrentUser,
  isSeller,
} from "@/lib/auth";

interface DashboardGuardProps {
  children: React.ReactNode;
}

export default function DashboardGuard({
  children,
}: DashboardGuardProps) {
  const router = useRouter();
  const user = getCurrentUser();
  const authorized = !!user && isSeller(user);

  useEffect(() => {
    if (!authorized) {
      router.replace("/marketplace");
    }
  }, [authorized, router]);

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
