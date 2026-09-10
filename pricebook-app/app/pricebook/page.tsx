import Link from 'next/link'
import { Suspense } from 'react'
import * as db from '@/lib/db'
import { formatCurrency } from '@/lib/format'
import { MarginBadge } from '@/components/MarginBadge'
import { BrandLogo } from '@/components/BrandLogo'
import { PricebookFilters } from './PricebookFilters'

export const metadata = {
  title: 'Pricebook — Barreau Énergies',
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export default async function PricebookPage({ searchParams }: PageProps<'/pricebook'>) {
  const params = await searchParams

  const items = db.listItems({
    search: first(params.q),
    category: first(params.category),
    brand: first(params.brand),
    type: first(params.type),
    status: (first(params.status) as 'active' | 'archived' | 'all' | undefined) ?? 'active',
  })
  const categories = db.distinctCategories()
  const brands = db.distinctBrands()

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Pricebook</h1>
          <p className="mt-1 text-sm text-foreground-secondary">
            {items.length} article{items.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/pricebook/new"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          + Nouvel article
        </Link>
      </div>

      <div className="mt-4">
        <Suspense fallback={<div className="h-10" />}>
          <PricebookFilters categories={categories} brands={brands} />
        </Suspense>
      </div>

      <div className="mt-6 space-y-2">
        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-sm text-foreground-secondary">Aucun article ne correspond à ces critères.</p>
            <Link href="/pricebook/new" className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
              Ajouter le premier article →
            </Link>
          </div>
        )}
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/pricebook/${item.id}`}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3 transition-colors hover:bg-surface-hover"
          >
            <div className="flex min-w-0 items-center gap-3">
              {item.brand && <BrandLogo brand={item.brand} className="h-6 w-10 shrink-0" />}
              <div className="min-w-0">
                <p className="truncate font-medium">{item.name}</p>
                <p className="truncate text-xs text-foreground-secondary">
                  {item.category}
                  {item.brand ? ` · ${item.brand}` : ''}
                  {item.reference ? ` · Réf. ${item.reference}` : ''}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-sm font-semibold">{formatCurrency(item.sellPrice)}</span>
              <MarginBadge costPrice={item.costPrice} sellPrice={item.sellPrice} />
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
