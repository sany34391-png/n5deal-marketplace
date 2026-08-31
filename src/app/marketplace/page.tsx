import { Marketplace } from "@/components/assets/Marketplace";

export default function MarketplacePage() {
  return (
    <main className="marketplace-page">
      <section className="marketplace-page__hero">
        <span className="marketplace-page__eyebrow">
          N5DEAL MARKETPLACE
        </span>

        <h1>Investment opportunities</h1>

        <p>
          Discover businesses and financial assets available for acquisition.
        </p>
      </section>

      <Marketplace />
    </main>
  );
}