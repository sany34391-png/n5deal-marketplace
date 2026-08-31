import Link from "next/link";
import { notFound } from "next/navigation";
import { users, buyerProfiles } from "@/data/mock-data";

interface BuyerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BuyerPage({
  params,
}: BuyerPageProps) {
  const { id } = await params;

  const user = users.find((item) => item.id === id);

  if (!user || user.role !== "buyer") {
    notFound();
  }

  const profile = buyerProfiles.find(
    (item) => item.userId === user.id
  );

  if (!profile) {
    notFound();
  }

  return (
    <main className="buyer-page">
      <Link href="/buyers" className="buyer-page__back">
        ← Back to buyers
      </Link>

      <section className="buyer-page__header">
        <div>
          <span className="buyer-page__role">
            BUYER
          </span>

          <h1>{profile.companyName}</h1>

          <p>{profile.description}</p>
        </div>

        <div className="buyer-page__status">
          <span>Status</span>
          <strong>{user.status}</strong>
        </div>
      </section>

      <div className="buyer-page__content">
        <section className="buyer-page__card">
          <h2>Investment interests</h2>

          <div className="buyer-page__info">
            <div>
              <span>Minimum investment</span>
              <strong>
                ${profile.minInvestment.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Maximum investment</span>
              <strong>
                ${profile.maxInvestment.toLocaleString()}
              </strong>
            </div>
          </div>

          <h3>Industries</h3>

          <div className="buyer-page__tags">
            {profile.industries.map((industry) => (
              <span key={industry}>{industry}</span>
            ))}
          </div>

          <h3>Regions</h3>

          <div className="buyer-page__tags">
            {profile.regions.map((region) => (
              <span key={region}>{region}</span>
            ))}
          </div>
        </section>

        <aside className="buyer-page__contact">
          <span>CONTACT</span>

          <h2>Interested in working together?</h2>

          <p>
            Contact this buyer to discuss your opportunity.
          </p>

          <Link
            href={`/messages?user=${user.id}`}
            className="buyer-page__button"
          >
            Contact buyer
          </Link>
        </aside>
      </div>
    </main>
  );
}