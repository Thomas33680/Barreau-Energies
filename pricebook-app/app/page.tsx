import Link from 'next/link'
import * as db from '@/lib/db'
import { formatCurrency, formatPercent } from '@/lib/format'
import { StatTile } from '@/components/StatTile'

export default async function DashboardPage() {
  const stats = await db.getDashboardStats()
  const isEmpty = stats.totalActive === 0 && stats.totalArchived === 0

  if (isEmpty) {
    return (
      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center">
        <h1 className="text-xl font-semibold">Bienvenue sur votre pricebook</h1>
        <p className="mt-2 max-w-md text-sm text-foreground-secondary">
          Ajoutez vos produits et services (pompes à chaleur, climatisation, chauffe-eaux thermodynamiques…) avec
          leurs données techniques et financières pour les retrouver en un instant.
        </p>
        <Link
          href="/pricebook/new"
          className="mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          + Ajouter un article
        </Link>
      </main>
    )
  }

  const maxCategoryCount = Math.max(...stats.byCategory.map((c) => c.count), 1)
  const maxBrandCount = Math.max(...stats.byBrand.map((b) => b.count), 1)

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-xl font-semibold">Tableau de bord</h1>
      <p className="mt-1 text-sm text-foreground-secondary">Vue d&apos;ensemble de votre pricebook.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile label="Articles actifs" value={String(stats.totalActive)} />
        <StatTile label="Valeur du catalogue HT" value={formatCurrency(stats.catalogValue)} />
        <StatTile label="Marge moyenne" value={formatPercent(stats.averageMarginPercent)} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground-secondary">Par catégorie</h2>
          <ul className="mt-4 space-y-3">
            {stats.byCategory.map((c) => (
              <li key={c.category}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate font-medium">{c.category}</span>
                  <span className="shrink-0 text-foreground-secondary">
                    {c.count} · {formatCurrency(c.value)}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-hairline">
                  <div
                    className="h-1.5 rounded-full bg-accent"
                    style={{ width: `${(c.count / maxCategoryCount) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground-secondary">Par marque</h2>
          {stats.byBrand.length === 0 ? (
            <p className="mt-4 text-sm text-foreground-muted">Aucune marque renseignée pour le moment.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {stats.byBrand.map((b) => (
                <li key={b.brand}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="truncate font-medium">{b.brand}</span>
                    <span className="shrink-0 text-foreground-secondary">{b.count}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-hairline">
                    <div
                      className="h-1.5 rounded-full bg-accent"
                      style={{ width: `${(b.count / maxBrandCount) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="mt-6 flex justify-end">
        <Link href="/pricebook" className="text-sm font-medium text-accent hover:underline">
          Voir tout le pricebook →
        </Link>
      </div>
    </main>
  )
}
