'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

interface Props {
  categories: string[]
  brands: string[]
}

const selectClass =
  'rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30'

export function PricebookFilters({ categories, brands }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const [q, setQ] = useState(searchParams.get('q') ?? '')

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }

  useEffect(() => {
    const current = searchParams.get('q') ?? ''
    if (q === current) return
    const timeout = setTimeout(() => updateParam('q', q), 300)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q])

  return (
    <div className="flex flex-wrap gap-2">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher (nom, référence, marque…)"
        className="min-w-[220px] flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
      <select
        value={searchParams.get('category') ?? ''}
        onChange={(e) => updateParam('category', e.target.value)}
        className={selectClass}
      >
        <option value="">Toutes catégories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={searchParams.get('brand') ?? ''}
        onChange={(e) => updateParam('brand', e.target.value)}
        className={selectClass}
      >
        <option value="">Toutes marques</option>
        {brands.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <select
        value={searchParams.get('type') ?? ''}
        onChange={(e) => updateParam('type', e.target.value)}
        className={selectClass}
      >
        <option value="">Tous types</option>
        <option value="produit">Produits</option>
        <option value="service">Services</option>
      </select>
      <select
        value={searchParams.get('status') ?? 'active'}
        onChange={(e) => updateParam('status', e.target.value)}
        className={selectClass}
      >
        <option value="active">Actifs</option>
        <option value="archived">Archivés</option>
        <option value="all">Tous</option>
      </select>
    </div>
  )
}
