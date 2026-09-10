import { notFound } from 'next/navigation'
import Link from 'next/link'
import * as db from '@/lib/db'
import { updateItemAction } from '../../actions'
import { ItemForm } from '../../ItemForm'

export default async function EditPricebookItemPage({ params }: PageProps<'/pricebook/[id]/edit'>) {
  const { id } = await params
  const item = db.getItem(id)
  if (!item) notFound()

  const categories = db.distinctCategories()
  const brands = db.distinctBrands()
  const boundAction = updateItemAction.bind(null, item.id)

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link href={`/pricebook/${item.id}`} className="text-sm text-foreground-secondary hover:text-foreground">
        ← {item.name}
      </Link>
      <h1 className="mt-3 text-xl font-semibold">Modifier l&apos;article</h1>
      <div className="mt-6">
        <ItemForm
          action={boundAction}
          initial={item}
          categories={categories}
          brands={brands}
          submitLabel="Enregistrer les modifications"
        />
      </div>
    </main>
  )
}
