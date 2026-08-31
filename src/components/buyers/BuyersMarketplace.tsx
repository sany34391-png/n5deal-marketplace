"use client";

import { useMemo, useState } from "react";
import { users, buyerProfiles } from "@/data/mock-data";
import { BuyerCard } from "./BuyerCard";

export function BuyersMarketplace() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");

  const buyers = users
    .filter((user) => user.role === "buyer")
    .map((user) => ({
      user,
      profile: buyerProfiles.find(
        (profile) => profile.userId === user.id
      ),
    }))
    .filter(
      (
        item
      ): item is {
        user: typeof item.user;
        profile: NonNullable<typeof item.profile>;
      } => Boolean(item.profile)
    );

  const industries = [
    ...new Set(
      buyers.flatMap((buyer) => buyer.profile.industries)
    ),
  ];

  const filteredBuyers = useMemo(() => {
    return buyers.filter(({ user, profile }) => {
      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        profile.companyName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        profile.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesIndustry =
        industry === "all" ||
        profile.industries.includes(industry);

      return matchesSearch && matchesIndustry;
    });
  }, [search, industry]);

  return (
    <div className="buyers-marketplace">
      <div className="buyers-marketplace__toolbar">
        <input
          type="search"
          placeholder="Search buyers..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={industry}
          onChange={(event) => setIndustry(event.target.value)}
        >
          <option value="all">All industries</option>

          {industries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => {
            setSearch("");
            setIndustry("all");
          }}
        >
          Reset
        </button>
      </div>

      <div className="buyers-marketplace__result">
        <strong>{filteredBuyers.length}</strong>{" "}
        {filteredBuyers.length === 1 ? "buyer" : "buyers"}
      </div>

      {filteredBuyers.length === 0 ? (
        <div className="buyers-marketplace__empty">
          <h2>No buyers found</h2>
          <p>Try changing your search or filters.</p>
        </div>
      ) : (
        <div className="buyers-marketplace__grid">
          {filteredBuyers.map(({ user, profile }) => (
            <BuyerCard
              key={user.id}
              user={user}
              profile={profile}
            />
          ))}
        </div>
      )}
    </div>
  );
}