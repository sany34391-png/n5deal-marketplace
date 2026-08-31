import { BuyersMarketplace } from "@/components/buyers/BuyersMarketplace";

export default function BuyersPage() {
  return (
    <main className="buyers-page">
      <section className="buyers-page__hero">
        <span>BUYER NETWORK</span>

        <h1>Find the right buyer</h1>

        <p>
          Discover investors and acquisition companies
          looking for new opportunities.
        </p>
      </section>

      <BuyersMarketplace />
    </main>
  );
}