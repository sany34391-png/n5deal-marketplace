import Link from "next/link";
import type { Asset } from "@/types/marketplace";

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <article>
      <div>
        <span>{asset.industry}</span>
        <span>{asset.location}</span>
      </div>

      <h2>{asset.title}</h2>

      <p>{asset.description}</p>

      <div>
        <span>Asking price</span>

        <strong>
          ${asset.price.toLocaleString()}
        </strong>
      </div>

      <Link href={`/assets/${asset.id}`}>
        View opportunity
      </Link>
    </article>
  );
}