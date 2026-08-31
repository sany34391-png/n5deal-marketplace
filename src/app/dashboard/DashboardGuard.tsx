"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, isSeller } from "@/lib/auth";

interface DashboardGuardProps {
  children: React.ReactNode;
}

export default function DashboardGuard({
  children,
}: DashboardGuardProps) {
  const router = useRouter();
  const user = getCurrentUser();

  useEffect(() => {
    if (!isSeller(user)) {
      router.replace("/marketplace");
    }
  }, [router, user]);

  if (!isSeller(user)) {
    return null;
  }

  return <>{children}</>;
}