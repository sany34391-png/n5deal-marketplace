import { assets } from "@/data/mock-data";
import { AssetCard } from "@/components/assets/AssetCard";

export default function MarketplacePage() {
  return (
    <main>
      <section>
        <span>MARKETPLACE</span>

        <h1>Investment opportunities</h1>

        <p>
          Discover businesses and assets available for acquisition.
        </p>
      </section>

      <section>
        <div>
          <strong>{assets.length}</strong>
          <span> opportunities</span>
        </div>

        <div>
          {assets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
            />
          ))}
        </div>
      </section>
    </main>
  );
}