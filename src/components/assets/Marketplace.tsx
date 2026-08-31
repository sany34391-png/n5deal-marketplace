
"use client";

import { useMemo, useState } from "react";
import { AssetCard } from "./AssetCard";
import { useAssets } from "@/lib/assets-store";

export function Marketplace() {
  const assets = useAssets();

  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("all");

  const industries = useMemo(() => {
    return [
      ...new Set(
        assets.map((asset) => asset.industry)
      ),
    ];
  }, [assets]);

  const locations = useMemo(() => {
    return [
      ...new Set(
        assets.map((asset) => asset.location)
      ),
    ];
  }, [assets]);

  const filteredAssets = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return assets.filter((asset) => {
      const matchesSearch =
        asset.title
          .toLowerCase()
          .includes(searchValue) ||
        asset.description
          .toLowerCase()
          .includes(searchValue);

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
  }, [
    assets,
    search,
    industry,
    location,
  ]);

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
            <option
              key={item}
              value={item}
            >
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
            <option
              key={item}
              value={item}
            >
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
        <strong>
          {filteredAssets.length}
        </strong>{" "}
        {filteredAssets.length === 1
          ? "opportunity"
          : "opportunities"}
      </div>

      {filteredAssets.length === 0 ? (
        <div className="marketplace__empty">
          <h2>
            No opportunities found
          </h2>

          <p>
            Try changing your search or
            filters.
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
