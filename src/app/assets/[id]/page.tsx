import Link from "next/link";
import { notFound } from "next/navigation";
import { assets, users } from "@/data/mock-data";

interface AssetPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AssetPage({
  params,
}: AssetPageProps) {
  const { id } = await params;

  const asset = assets.find((item) => item.id === id);

  if (!asset) {
    notFound();
  }

  const seller = users.find((user) => user.id === asset.sellerId);

  if (!seller) {
    notFound();
  }

  return (
    <main className="asset-page">
      <Link href="/marketplace" className="asset-page__back">
        ← Back to marketplace
      </Link>

      <section className="asset-page__header">
        <div>
          <span className="asset-page__industry">
            {asset.industry}
          </span>

          <h1>{asset.title}</h1>

          <p>{asset.location}</p>
        </div>

        <div className="asset-page__price">
          <span>Asking price</span>

          <strong>
            ${asset.price.toLocaleString()}
          </strong>
        </div>
      </section>

      <div className="asset-page__content">
        <section className="asset-page__description">
          <h2>About this opportunity</h2>

          <p>{asset.description}</p>

          <div>
            <p>
              <strong>Revenue:</strong>{" "}
              ${asset.revenue.toLocaleString()}
            </p>

            <p>
              <strong>EBITDA:</strong>{" "}
              ${asset.ebitda.toLocaleString()}
            </p>
          </div>
        </section>

        <aside className="asset-page__seller">
          <span>SELLER</span>

          <h2>{seller.name}</h2>

          <p>Verified marketplace participant</p>

          <Link
            href={`/messages?asset=${asset.id}&seller=${seller.id}`}
            className="asset-page__contact"
          >
            Contact seller
          </Link>
        </aside>
      </div>
    </main>
  );
}