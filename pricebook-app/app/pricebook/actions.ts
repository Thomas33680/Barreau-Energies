'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as db from '@/lib/db'
import type { PricebookItemInput, Spec } from '@/lib/types'

export interface FormState {
  error?: string
}

function parseSpecs(formData: FormData): Spec[] {
  const labels = formData.getAll('specLabel').map(String)
  const values = formData.getAll('specValue').map(String)
  const specs: Spec[] = []
  for (let i = 0; i < Math.max(labels.length, values.length); i++) {
    const label = (labels[i] ?? '').trim()
    const value = (values[i] ?? '').trim()
    if (label || value) specs.push({ label, value })
  }
  return specs
}

function parseInput(formData: FormData): PricebookItemInput | { error: string } {
  const name = String(formData.get('name') ?? '').trim()
  const category = String(formData.get('category') ?? '').trim()
  if (!name) return { error: 'Le nom est obligatoire.' }
  if (!category) return { error: 'La catégorie est obligatoire.' }

  const type = formData.get('type') === 'service' ? 'service' : 'produit'
  const costPrice = Number(formData.get('costPrice') ?? 0) || 0
  const sellPrice = Number(formData.get('sellPrice') ?? 0) || 0
  const vatRate = Number(formData.get('vatRate') ?? 20) || 0
  const active = formData.get('active') === 'on'

  return {
    reference: String(formData.get('reference') ?? '').trim(),
    name,
    type,
    category,
    brand: String(formData.get('brand') ?? '').trim(),
    model: String(formData.get('model') ?? '').trim(),
    unit: String(formData.get('unit') ?? 'pièce').trim() || 'pièce',
    costPrice,
    sellPrice,
    vatRate,
    supplier: String(formData.get('supplier') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    specs: parseSpecs(formData),
    active,
  }
}

export async function createItemAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const input = parseInput(formData)
  if ('error' in input) return input

  const id = await db.createItem(input)
  revalidatePath('/pricebook')
  revalidatePath('/')
  redirect(`/pricebook/${id}`)
}

export async function updateItemAction(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const existing = await db.getItem(id)
  if (!existing) return { error: 'Article introuvable.' }

  const input = parseInput(formData)
  if ('error' in input) return input

  await db.updateItem(id, input)
  revalidatePath('/pricebook')
  revalidatePath(`/pricebook/${id}`)
  revalidatePath('/')
  redirect(`/pricebook/${id}`)
}

export async function deleteItemAction(id: string) {
  await db.deleteItem(id)
  revalidatePath('/pricebook')
  revalidatePath('/')
  redirect('/pricebook')
}
