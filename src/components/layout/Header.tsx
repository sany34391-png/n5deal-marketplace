
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCurrentUser, isSeller } from "@/lib/auth";

export function Header() {
  const pathname = usePathname();
  const currentUser = getCurrentUser();

  const isActive = (path: string) =>
    pathname === path;

  return (
    <header className="site-header">
      <div className="site-header__container">
        <Link
          href="/marketplace"
          className="site-header__logo"
        >
          N5Deal
        </Link>

        <nav className="site-header__nav">
          <Link
            href="/marketplace"
            className={
              isActive("/marketplace")
                ? "active"
                : ""
            }
          >
            Marketplace
          </Link>

          <Link
            href="/buyers"
            className={
              isActive("/buyers")
                ? "active"
                : ""
            }
          >
            Buyers
          </Link>

          {currentUser && (
            <Link
              href="/messages"
              className={
                isActive("/messages")
                  ? "active"
                  : ""
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
                  ? "active"
                  : ""
              }
            >
              Dashboard
            </Link>
          )}

          {!currentUser && (
            <Link
              href="/login"
              className={
                isActive("/login")
                  ? "active"
                  : ""
              }
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
