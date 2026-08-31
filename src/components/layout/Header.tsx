import Link from "next/link";

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/marketplace" className="header__logo">
          N5Deal
        </Link>

        <nav className="header__nav">
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/buyers">Buyers</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>

        <div className="header__actions">
          <Link href="/messages">Messages</Link>

          <button type="button" className="header__profile">
            AS
          </button>
        </div>
      </div>
    </header>
  );
}