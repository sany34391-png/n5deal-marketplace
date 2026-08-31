
import Link from "next/link";
import type { BuyerProfile, User } from "@/types/marketplace";

interface BuyerCardProps {
  user: User;
  profile: BuyerProfile;
}

export function BuyerCard({
  user,
  profile,
}: BuyerCardProps) {
  return (
    <article className="buyer-card">
      <div className="buyer-card__top">
        <span>BUYER</span>

        <span className="buyer-card__status">
          {user.status}
        </span>
      </div>

      <h2>{profile.companyName}</h2>

      <p className="buyer-card__description">
        {profile.description}
      </p>

      <div className="buyer-card__info">
        <div>
          <span>Investment range</span>

          <strong>
            ${profile.minInvestment.toLocaleString()} – $
            {profile.maxInvestment.toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Industries</span>

          <strong>
            {profile.industries.join(", ")}
          </strong>
        </div>
      </div>

      <div className="buyer-card__actions">
        <Link
          href={`/buyers/${user.id}`}
          className="buyer-card__button"
        >
          View buyer
        </Link>

        <Link
          href={`/messages?user=${user.id}`}
          className="buyer-card__button buyer-card__button--secondary"
        >
          Contact buyer
        </Link>
      </div>
    </article>
  );
}

