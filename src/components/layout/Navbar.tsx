
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCurrentUser, isSeller } from "@/lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const currentUser = getCurrentUser();

  const isActive = (path: string) =>
    pathname === path;

  return (
    <nav className="navbar">
      <Link href="/marketplace" className="navbar__logo">
        N5Deal
      </Link>

      <div className="navbar__links">
        <Link
          href="/marketplace"
          className={
            isActive("/marketplace")
              ? "navbar__link navbar__link--active"
              : "navbar__link"
          }
        >
          Marketplace
        </Link>

        {currentUser && (
          <Link
            href="/messages"
            className={
              isActive("/messages")
                ? "navbar__link navbar__link--active"
                : "navbar__link"
            }
          >
            Messages
          </Link>
        )}

        {isSeller(currentUser) && (
          <Link
            href="/dashboard"
            className={
              isActive("/dashboard")
                ? "navbar__link navbar__link--active"
                : "navbar__link"
            }
          >
            Dashboard
          </Link>
        )}

        {!currentUser && (
          <Link
            href="/login"
            className="navbar__link"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
