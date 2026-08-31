
"use client";

import { useMemo, useState } from "react";
import { assets as initialAssets } from "@/data/mock-data";
import { AssetCard } from "./AssetCard";
import type { Asset } from "@/types/marketplace";

export function Marketplace() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("all");

  const [assets] = useState<Asset[]>(() => {
    if (typeof window === "undefined") {
      return initialAssets;
    }

    try {
      const savedAssets = localStorage.getItem("n5deal-assets");

      if (savedAssets) {
        return JSON.parse(savedAssets) as Asset[];
      }
    } catch {
      return initialAssets;
    }

    return initialAssets;
  });

  const industries = [
    ...new Set(assets.map((asset) => asset.industry)),
  ];

  const locations = [
    ...new Set(assets.map((asset) => asset.location)),
  ];

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        asset.title.toLowerCase().includes(searchValue) ||
        asset.description.toLowerCase().includes(searchValue);

      const matchesIndustry =
        industry === "all" ||
        asset.industry === industry;

      const matchesLocation =
        location === "all" ||
        asset.location === location;

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesLocation
      );
    });
  }, [assets, search, industry, location]);

  const resetFilters = () => {
    setSearch("");
    setIndustry("all");
    setLocation("all");
  };

  return (
    <div className="marketplace">
      <div className="marketplace__toolbar">
        <input
          type="search"
          placeholder="Search opportunities..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={industry}
          onChange={(event) =>
            setIndustry(event.target.value)
          }
        >
          <option value="all">
            All industries
          </option>

          {industries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={location}
          onChange={(event) =>
            setLocation(event.target.value)
          }
        >
          <option value="all">
            All locations
          </option>

          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>

      <div className="marketplace__result">
        <strong>{filteredAssets.length}</strong>{" "}
        {filteredAssets.length === 1
          ? "opportunity"
          : "opportunities"}
      </div>

      {filteredAssets.length === 0 ? (
        <div className="marketplace__empty">
          <h2>No opportunities found</h2>

          <p>
            Try changing your search or filters.
          </p>

          <button
            type="button"
            onClick={resetFilters}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="marketplace__grid">
          {filteredAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
            />
          ))}
        </div>
      )}
    </div>
  );
}
