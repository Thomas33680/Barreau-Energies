import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as db from '@/lib/db'
import { computeMargin } from '@/lib/types'
import { formatCurrency, formatDate, formatPercent } from '@/lib/format'
import { MarginBadge } from '@/components/MarginBadge'
import { BrandLogo } from '@/components/BrandLogo'
import { deleteItemAction } from '../actions'
import { DeleteItemButton } from './DeleteItemButton'

export default async function PricebookItemPage({ params }: PageProps<'/pricebook/[id]'>) {
  const { id } = await params
  const item = await db.getItem(id)
  if (!item) notFound()

  const margin = computeMargin(item.costPrice, item.sellPrice)
  const sellPriceTtc = item.sellPrice * (1 + item.vatRate / 100)

  const infoRows: [string, string][] = [
    ['Référence', item.reference || '—'],
    ['Type', item.type === 'service' ? "Service / Main d'œuvre" : 'Produit'],
    ['Marque', item.brand || '—'],
    ['Modèle', item.model || '—'],
    ['Unité', item.unit],
    ['Fournisseur', item.supplier || '—'],
  ]

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/pricebook" className="text-sm text-foreground-secondary hover:text-foreground">
        ← Pricebook
      </Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {item.brand && <BrandLogo brand={item.brand} className="mt-0.5 h-8 w-auto shrink-0" />}
          <div>
            <p className="text-sm text-foreground-secondary">
              {item.category}
              {item.brand ? ` · ${item.brand}` : ''}
            </p>
            <h1 className="text-xl font-semibold">{item.name}</h1>
            {!item.active && (
              <span className="mt-2 inline-block rounded-full bg-surface-hover px-2 py-0.5 text-xs text-foreground-secondary">
                Archivé
              </span>
            )}
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            href={`/pricebook/${item.id}/edit`}
            className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-surface-hover"
          >
            Modifier
          </Link>
          <DeleteItemButton action={deleteItemAction.bind(null, item.id)} />
        </div>
      </div>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold text-foreground-secondary">Tarification</h2>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-foreground-muted">Achat HT</p>
            <p className="mt-0.5 font-semibold">{formatCurrency(item.costPrice)}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Vente HT</p>
            <p className="mt-0.5 font-semibold">{formatCurrency(item.sellPrice)}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Vente TTC ({item.vatRate}%)</p>
            <p className="mt-0.5 font-semibold">{formatCurrency(sellPriceTtc)}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Marge</p>
            <p className="mt-1">
              <MarginBadge costPrice={item.costPrice} sellPrice={item.sellPrice} />
            </p>
          </div>
        </div>
        {margin.percent !== null && margin.percent < 5 && (
          <p className="mt-3 text-xs text-critical-text">
            Marge sous le plancher des 5 % — vérifiez le prix de vente.
          </p>
        )}
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold text-foreground-secondary">Informations</h2>
        <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {infoRows.map(([label, value]) => (
            <div key={label} className="flex justify-between border-b border-hairline pb-2 text-sm sm:justify-start sm:gap-2">
              <dt className="text-foreground-secondary">{label}</dt>
              <dd className="font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {item.specs.length > 0 && (
        <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground-secondary">Fiche technique</h2>
          <dl className="mt-3 divide-y divide-hairline">
            {item.specs.map((spec, i) => (
              <div key={i} className="flex justify-between gap-4 py-2 text-sm">
                <dt className="text-foreground-secondary">{spec.label || '—'}</dt>
                <dd className="text-right font-medium">{spec.value || '—'}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {item.description && (
        <section className="mt-6 rounded-2xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground-secondary">Notes</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm">{item.description}</p>
        </section>
      )}

      <p className="mt-6 text-xs text-foreground-muted">
        Créé le {formatDate(item.createdAt)} · Modifié le {formatDate(item.updatedAt)}
      </p>
    </main>
  )
}
