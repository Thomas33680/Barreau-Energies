import Link from 'next/link'
import { logout } from '@/app/login/actions'

export function NavBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="shrink-0 font-semibold tracking-tight">
          Barreau <span className="text-accent">Énergies</span>
        </Link>
        <nav className="flex items-center gap-0.5 text-sm sm:gap-1">
          <Link href="/" className="whitespace-nowrap rounded-lg px-2 py-1.5 hover:bg-surface-hover sm:px-3">
            <span className="sm:hidden">Accueil</span>
            <span className="hidden sm:inline">Tableau de bord</span>
          </Link>
          <Link
            href="/pricebook"
            className="whitespace-nowrap rounded-lg px-2 py-1.5 hover:bg-surface-hover sm:px-3"
          >
            Pricebook
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="whitespace-nowrap rounded-lg px-2 py-1.5 text-foreground-secondary hover:bg-surface-hover hover:text-foreground sm:px-3"
            >
              <span className="sm:hidden">Sortir</span>
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}
