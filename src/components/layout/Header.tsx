
import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__container">
        <Link
          href="/"
          className="site-header__logo"
        >
          N5Deal
        </Link>

        <nav className="site-header__nav">
          <Link href="/marketplace">
            Marketplace
          </Link>

          <Link href="/buyers">
            Buyers
          </Link>

          <Link href="/messages">
            Messages
          </Link>

          <Link href="/dashboard">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
