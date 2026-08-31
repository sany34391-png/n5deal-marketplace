
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/types/marketplace";

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState<UserRole>("buyer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const currentUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role,
    };

    localStorage.setItem(
      "n5deal-current-user",
      JSON.stringify(currentUser)
    );

    if (role === "seller") {
      router.push("/dashboard");
    } else {
      router.push("/marketplace");
    }
  };

  return (
    <main className="register-page">
      <section className="register-page__card">
        <span>JOIN N5DEAL</span>

        <h1>Create account</h1>

        <p>
          Choose your role and create your N5Deal account.
        </p>

        <div className="register-page__roles">
          <button
            type="button"
            className={
              role === "buyer"
                ? "register-page__role register-page__role--active"
                : "register-page__role"
            }
            onClick={() => setRole("buyer")}
          >
            <strong>Buyer</strong>

            <span>
              Find and acquire businesses.
            </span>
          </button>

          <button
            type="button"
            className={
              role === "seller"
                ? "register-page__role register-page__role--active"
                : "register-page__role"
            }
            onClick={() => setRole("seller")}
          >
            <strong>Seller</strong>

            <span>
              List and sell your business.
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">
              Full name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Alexander Borodin"
              autoComplete="name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="alex@example.com"
              autoComplete="email"
            />
          </div>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button type="submit">
            Create account as{" "}
            {role === "buyer" ? "Buyer" : "Seller"}
          </button>
        </form>

        <div className="register-page__login">
          <span>Already have an account?</span>

          <button
            type="button"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </section>
    </main>
  );
}
