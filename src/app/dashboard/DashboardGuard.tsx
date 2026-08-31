"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { currentUser } from "@/lib/auth";

interface DashboardGuardProps {
  children: React.ReactNode;
}

export default function DashboardGuard({
  children,
}: DashboardGuardProps) {
  const router = useRouter();

  useEffect(() => {
    if (currentUser.role !== "seller") {
      router.replace("/marketplace");
    }
  }, [router]);

  if (currentUser.role !== "seller") {
    return null;
  }

  return <>{children}</>;
}