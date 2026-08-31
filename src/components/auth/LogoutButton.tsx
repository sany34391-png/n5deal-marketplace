"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("n5deal-current-user");
    router.push("/login");
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}