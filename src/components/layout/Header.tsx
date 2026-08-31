"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getCurrentUser,
  type CurrentUser,
} from "@/lib/auth";

export function Header() {
  const [user, setUser] =
    useState<CurrentUser | null>(null);

  useEffect(() => {
    const updateUser = () => {
      setUser(getCurrentUser());
    };

    updateUser();

    window.addEventListener(
      "storage",
      updateUser
    );

    window.addEventListener(
      "n5deal-auth-updated",
      updateUser
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateUser
      );

      window.removeEventListener(
        "n5deal-auth-updated",
        updateUser
      );
    };
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__container">
        <Link
          href="/"
          className="site-header__logo"
        >
          N5Deal
        </Link>

        <nav className="site-header__nav">
          <Link href="/marketplace">
            Marketplace
          </Link>

          <Link href="/buyers">
            Buyers
          </Link>

          <Link href="/messages">
            Messages
          </Link>

          {user ? (
            <Link href="/dashboard">
              Dashboard
            </Link>
          ) : (
            <Link href="/login">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}