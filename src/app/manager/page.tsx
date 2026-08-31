
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  users as initialUsers,
  assets as initialAssets,
} from "@/data/mock-data";
import type {
  Asset,
  User,
  UserRole,
} from "@/types/marketplace";
import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";

export default function ManagerPage() {
  const router = useRouter();
  const currentUser = getCurrentUser();

  const [users, setUsers] =
    useState<User[]>(initialUsers);

  const [assets, setAssets] =
    useState<Asset[]>(initialAssets);

  const [userSearch, setUserSearch] = useState("");
  const [userRole, setUserRole] =
    useState<UserRole | "all">("all");

  const [assetSearch, setAssetSearch] =
    useState("");

  const [assetStatus, setAssetStatus] =
    useState<Asset["status"] | "all">("all");

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
      return;
    }

    if (currentUser.role !== "manager") {
      router.replace("/dashboard");
    }
  }, [currentUser, router]);

  const filteredUsers = useMemo(() => {
    const search = userSearch
      .toLowerCase()
      .trim();

    return users.filter((user) => {
      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(search) ||
        user.email
          .toLowerCase()
          .includes(search);

      const matchesRole =
        userRole === "all" ||
        user.role === userRole;

      return (
        matchesSearch &&
        matchesRole
      );
    });
  }, [
    users,
    userSearch,
    userRole,
  ]);

  const filteredAssets = useMemo(() => {
    const search = assetSearch
      .toLowerCase()
      .trim();

    return assets.filter((asset) => {
      const matchesSearch =
        asset.title
          .toLowerCase()
          .includes(search) ||
        asset.industry
          .toLowerCase()
          .includes(search) ||
        asset.location
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        assetStatus === "all" ||
        asset.status === assetStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    assets,
    assetSearch,
    assetStatus,
  ]);

  const toggleUserStatus = (
    userId: string
  ) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) => {
        if (user.id !== userId) {
          return user;
        }

        return {
          ...user,
          status:
            user.status === "active"
              ? "suspended"
              : "active",
        };
      })
    );
  };

  const toggleAssetStatus = (
    assetId: string
  ) => {
    setAssets((currentAssets) =>
      currentAssets.map((asset) => {
        if (asset.id !== assetId) {
          return asset;
        }

        return {
          ...asset,
          status:
            asset.status === "active"
              ? "suspended"
              : "active",
        };
      })
    );
  };

  const activeUsers = users.filter(
    (user) => user.status === "active"
  ).length;

  const suspendedUsers = users.filter(
    (user) =>
      user.status === "suspended"
  ).length;

  const activeAssets = assets.filter(
    (asset) => asset.status === "active"
  ).length;

  const suspendedAssets = assets.filter(
    (asset) =>
      asset.status === "suspended"
  ).length;

  if (!currentUser) {
    return (
      <main className="manager-page">
        <p>Loading manager panel...</p>
      </main>
    );
  }

  return (
    <main className="manager-page">
      <section className="manager-page__header">
        <div>
          <span>MANAGER PANEL</span>

          <h1>Platform management</h1>

          <p>
            Manage users and marketplace assets.
          </p>
        </div>

        <LogoutButton />
      </section>

      <section className="manager-page__stats">
        <article className="manager-stat">
          <span>Total users</span>
          <strong>
            {users.length}
          </strong>
        </article>

        <article className="manager-stat">
          <span>Active users</span>
          <strong>
            {activeUsers}
          </strong>
        </article>

        <article className="manager-stat">
          <span>Suspended users</span>
          <strong>
            {suspendedUsers}
          </strong>
        </article>

        <article className="manager-stat">
          <span>Active assets</span>
          <strong>
            {activeAssets}
          </strong>
        </article>

        <article className="manager-stat">
          <span>Suspended assets</span>
          <strong>
            {suspendedAssets}
          </strong>
        </article>
      </section>

      <section className="manager-page__section">
        <div className="manager-page__section-header">
          <div>
            <span>USERS</span>

            <h2>User management</h2>
          </div>

          <div className="manager-page__filters">
            <input
              type="search"
              placeholder="Search users..."
              value={userSearch}
              onChange={(event) =>
                setUserSearch(
                  event.target.value
                )
              }
            />

            <select
              value={userRole}
              onChange={(event) =>
                setUserRole(
                  event.target
                    .value as
                    | UserRole
                    | "all"
                )
              }
            >
              <option value="all">
                All roles
              </option>

              <option value="buyer">
                Buyers
              </option>

              <option value="seller">
                Sellers
              </option>

              <option value="manager">
                Managers
              </option>
            </select>
          </div>
        </div>

        <div className="manager-table">
          {filteredUsers.length === 0 ? (
            <div className="manager-page__empty">
              <h3>
                No users found
              </h3>

              <p>
                Try changing your
                search or filters.
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <article
                key={user.id}
                className="manager-row"
              >
                <div className="manager-row__main">
                  <strong>
                    {user.name}
                  </strong>

                  <span>
                    {user.email}
                  </span>
                </div>

                <span className="manager-row__role">
                  {user.role}
                </span>

                <span
                  className={`manager-row__status manager-row__status--${user.status}`}
                >
                  {user.status}
                </span>

                {user.role !==
                "manager" ? (
                  <button
                    type="button"
                    onClick={() =>
                      toggleUserStatus(
                        user.id
                      )
                    }
                  >
                    {user.status ===
                    "active"
                      ? "Suspend"
                      : "Activate"}
                  </button>
                ) : (
                  <span className="manager-row__protected">
                    Protected
                  </span>
                )}
              </article>
            ))
          )}
        </div>
      </section>

      <section className="manager-page__section">
        <div className="manager-page__section-header">
          <div>
            <span>ASSETS</span>

            <h2>
              Asset management
            </h2>
          </div>

          <div className="manager-page__filters">
            <input
              type="search"
              placeholder="Search assets..."
              value={assetSearch}
              onChange={(event) =>
                setAssetSearch(
                  event.target.value
                )
              }
            />

            <select
              value={assetStatus}
              onChange={(event) =>
                setAssetStatus(
                  event.target
                    .value as
                    | Asset["status"]
                    | "all"
                )
              }
            >
              <option value="all">
                All statuses
              </option>

              <option value="active">
                Active
              </option>

              <option value="suspended">
                Suspended
              </option>
            </select>
          </div>
        </div>

        <div className="manager-table">
          {filteredAssets.length === 0 ? (
            <div className="manager-page__empty">
              <h3>
                No assets found
              </h3>

              <p>
                Try changing your
                search or filters.
              </p>
            </div>
          ) : (
            filteredAssets.map(
              (asset) => {
                const seller =
                  users.find(
                    (user) =>
                      user.id ===
                      asset.sellerId
                  );

                return (
                  <article
                    key={asset.id}
                    className="manager-row"
                  >
                    <div className="manager-row__main">
                      <strong>
                        {asset.title}
                      </strong>

                      <span>
                        {asset.industry}{" "}
                        ·{" "}
                        {asset.location}
                      </span>

                      <small>
                        Seller:{" "}
                        {seller?.name ??
                          "Unknown"}
                      </small>
                    </div>

                    <strong>
                      $
                      {asset.price.toLocaleString(
                        "en-US"
                      )}
                    </strong>

                    <span
                      className={`manager-row__status manager-row__status--${asset.status}`}
                    >
                      {asset.status}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        toggleAssetStatus(
                          asset.id
                        )
                      }
                    >
                      {asset.status ===
                      "active"
                        ? "Suspend"
                        : "Activate"}
                    </button>
                  </article>
                );
              }
            )
          )}
        </div>
      </section>
    </main>
  );
}

