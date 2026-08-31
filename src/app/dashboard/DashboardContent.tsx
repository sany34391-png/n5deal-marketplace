
"use client";

import { FormEvent, useState } from "react";
import { assets as initialAssets } from "@/data/mock-data";
import type { Asset } from "@/types/marketplace";
import {
  assetSchema,
  type AssetFormData,
} from "@/schemas/asset.schema";

const SELLER_ID = "user-3";

export default function DashboardContent() {
  const [assets, setAssets] = useState<Asset[]>(() => {
    if (typeof window === "undefined") {
      return initialAssets;
    }

    try {
      const savedAssets =
        localStorage.getItem("n5deal-assets");

      return savedAssets
        ? JSON.parse(savedAssets)
        : initialAssets;
    } catch {
      return initialAssets;
    }
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [revenue, setRevenue] = useState("");
  const [ebitda, setEbitda] = useState("");

  const [errors, setErrors] = useState<
    Partial<Record<keyof AssetFormData, string>>
  >({});

  const sellerAssets = assets.filter(
    (asset) => asset.sellerId === SELLER_ID
  );

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = {
      title,
      description,
      industry,
      location,
      price: Number(price),
      revenue: Number(revenue),
      ebitda: Number(ebitda),
    };

    const result = assetSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof AssetFormData, string>
      > = {};

      result.error.issues.forEach((issue) => {
        const field =
          issue.path[0] as keyof AssetFormData;

        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);

      return;
    }

    setErrors({});

    const newAsset: Asset = {
      id: `asset-${Date.now()}`,
      sellerId: SELLER_ID,
      title: result.data.title.trim(),
      description: result.data.description.trim(),
      industry: result.data.industry.trim(),
      location: result.data.location.trim(),
      price: result.data.price,
      revenue: result.data.revenue,
      ebitda: result.data.ebitda,
      status: "active",
    };

    const updatedAssets = [...assets, newAsset];

    setAssets(updatedAssets);

    localStorage.setItem(
      "n5deal-assets",
      JSON.stringify(updatedAssets)
    );

    setTitle("");
    setDescription("");
    setIndustry("");
    setLocation("");
    setPrice("");
    setRevenue("");
    setEbitda("");

    alert("Asset published successfully!");
  };

  return (
    <main className="dashboard-page">
      <section className="dashboard-page__header">
        <span>SELLER DASHBOARD</span>

        <h1>Manage your opportunities</h1>

        <p>
          Publish and manage your assets on the N5Deal
          marketplace.
        </p>
      </section>

      <section className="dashboard-page__content">
        <div className="dashboard-page__form-card">
          <h2>Publish an asset</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="title">
                Asset title
              </label>

              <input
                id="title"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="e.g. B2B SaaS Company"
              />

              {errors.title && (
                <p className="form-error">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Describe the opportunity..."
                rows={5}
              />

              {errors.description && (
                <p className="form-error">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="dashboard-page__row">
              <div className="form-field">
                <label htmlFor="industry">
                  Industry
                </label>

                <input
                  id="industry"
                  value={industry}
                  onChange={(event) =>
                    setIndustry(event.target.value)
                  }
                  placeholder="SaaS"
                />

                {errors.industry && (
                  <p className="form-error">
                    {errors.industry}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  placeholder="Germany"
                />

                {errors.location && (
                  <p className="form-error">
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            <div className="dashboard-page__row">
              <div className="form-field">
                <label htmlFor="price">
                  Asking price
                </label>

                <input
                  id="price"
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  placeholder="2400000"
                />

                {errors.price && (
                  <p className="form-error">
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="revenue">
                  Revenue
                </label>

                <input
                  id="revenue"
                  type="number"
                  min="0"
                  value={revenue}
                  onChange={(event) =>
                    setRevenue(event.target.value)
                  }
                  placeholder="1100000"
                />

                {errors.revenue && (
                  <p className="form-error">
                    {errors.revenue}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="ebitda">
                  EBITDA
                </label>

                <input
                  id="ebitda"
                  type="number"
                  min="0"
                  value={ebitda}
                  onChange={(event) =>
                    setEbitda(event.target.value)
                  }
                  placeholder="320000"
                />

                {errors.ebitda && (
                  <p className="form-error">
                    {errors.ebitda}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="dashboard-page__submit"
            >
              Publish asset
            </button>
          </form>
        </div>

        <aside className="dashboard-page__assets">
          <h2>Your assets</h2>

          {sellerAssets.length === 0 ? (
            <p>No assets published yet.</p>
          ) : (
            sellerAssets.map((asset) => (
              <article
                key={asset.id}
                className="dashboard-asset"
              >
                <span>{asset.industry}</span>

                <h3>{asset.title}</h3>

                <p>{asset.location}</p>

                <strong>
                  ${asset.price.toLocaleString()}
                </strong>
              </article>
            ))
          )}
        </aside>
      </section>
    </main>
  );
}
