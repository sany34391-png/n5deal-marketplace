
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { users } from "@/data/mock-data";
import type { UserRole } from "@/types/marketplace";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const normalizedEmail = email
      .trim()
      .toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter your email.");
      return;
    }

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail
    );

    if (!user) {
      setError(
        "User with this email was not found."
      );
      return;
    }

    if (user.status === "suspended") {
      setError(
        "This account has been suspended."
      );
      return;
    }

    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    };

    localStorage.setItem(
      "n5deal-current-user",
      JSON.stringify(currentUser)
    );

    if (user.role === "manager") {
      router.push("/manager");
      return;
    }

    if (user.role === "seller") {
      router.push("/dashboard");
      return;
    }

    router.push("/marketplace");
  };

  const loginAs = (userEmail: string) => {
    setEmail(userEmail);
    setError("");
  };

  return (
    <main className="login-page">
      <section className="login-page__card">
        <span>WELCOME BACK</span>

        <h1>Login</h1>

        <p>
          Sign in to your N5Deal account.
        </p>

        <form onSubmit={handleSubmit}>
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
              placeholder="alex.borodin@example.com"
              autoComplete="email"
            />
          </div>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button type="submit">
            Login
          </button>
        </form>

        <div className="login-page__demo">
          <p>Demo accounts:</p>

          <button
            type="button"
            onClick={() =>
              loginAs(
                "alex.borodin@example.com"
              )
            }
          >
            Login as Buyer
          </button>

          <button
            type="button"
            onClick={() =>
              loginAs(
                "daniel.carter@example.com"
              )
            }
          >
            Login as Seller
          </button>

          <button
            type="button"
            onClick={() =>
              loginAs(
                "manager@n5deal.com"
              )
            }
          >
            Login as Manager
          </button>
        </div>

        <div className="login-page__register">
          <span>
            Do not have an account?
          </span>

          <button
            type="button"
            onClick={() =>
              router.push("/register")
            }
          >
            Create account
          </button>
        </div>
      </section>
    </main>
  );
}
