import * as db from '@/lib/db'
import { createItemAction } from '../actions'
import { ItemForm } from '../ItemForm'

export const metadata = {
  title: 'Nouvel article — Pricebook',
}

export default function NewPricebookItemPage() {
  const categories = db.distinctCategories()
  const brands = db.distinctBrands()

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-xl font-semibold">Nouvel article</h1>
      <p className="mt-1 text-sm text-foreground-secondary">Ajoutez un produit ou un service au pricebook.</p>
      <div className="mt-6">
        <ItemForm
          action={createItemAction}
          categories={categories}
          brands={brands}
          submitLabel="Créer l'article"
        />
      </div>
    </main>
  )
}
