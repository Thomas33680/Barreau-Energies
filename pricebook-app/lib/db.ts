import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import type { PricebookItem, PricebookItemInput } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_PATH = process.env.DATABASE_PATH || path.join(DATA_DIR, 'pricebook.db')

function createConnection() {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
  const db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS pricebook_items (
      id TEXT PRIMARY KEY,
      reference TEXT NOT NULL DEFAULT '',
      name TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'produit',
      category TEXT NOT NULL,
      brand TEXT NOT NULL DEFAULT '',
      model TEXT NOT NULL DEFAULT '',
      unit TEXT NOT NULL DEFAULT 'pièce',
      cost_price REAL NOT NULL DEFAULT 0,
      sell_price REAL NOT NULL DEFAULT 0,
      vat_rate REAL NOT NULL DEFAULT 20,
      supplier TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      specs TEXT NOT NULL DEFAULT '[]',
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_pricebook_category ON pricebook_items(category);
    CREATE INDEX IF NOT EXISTS idx_pricebook_brand ON pricebook_items(brand);
  `)
  return db
}

// Reuse the connection across hot-reloads in dev so we don't leak file handles.
const globalForDb = globalThis as unknown as { pricebookDb?: Database.Database }
const db = globalForDb.pricebookDb ?? createConnection()
if (process.env.NODE_ENV !== 'production') globalForDb.pricebookDb = db

interface Row {
  id: string
  reference: string
  name: string
  type: string
  category: string
  brand: string
  model: string
  unit: string
  cost_price: number
  sell_price: number
  vat_rate: number
  supplier: string
  description: string
  specs: string
  active: number
  created_at: string
  updated_at: string
}

function rowToItem(row: Row): PricebookItem {
  let specs: PricebookItem['specs'] = []
  try {
    specs = JSON.parse(row.specs)
  } catch {
    specs = []
  }
  return {
    id: row.id,
    reference: row.reference,
    name: row.name,
    type: row.type === 'service' ? 'service' : 'produit',
    category: row.category,
    brand: row.brand,
    model: row.model,
    unit: row.unit,
    costPrice: row.cost_price,
    sellPrice: row.sell_price,
    vatRate: row.vat_rate,
    supplier: row.supplier,
    description: row.description,
    specs,
    active: row.active === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export interface ItemFilters {
  search?: string
  category?: string
  brand?: string
  type?: string
  status?: 'active' | 'archived' | 'all'
}

export function listItems(filters: ItemFilters = {}): PricebookItem[] {
  const clauses: string[] = []
  const params: Record<string, unknown> = {}

  if (filters.search) {
    clauses.push(
      `(name LIKE @search OR reference LIKE @search OR brand LIKE @search OR model LIKE @search OR description LIKE @search)`
    )
    params.search = `%${filters.search}%`
  }
  if (filters.category) {
    clauses.push('category = @category')
    params.category = filters.category
  }
  if (filters.brand) {
    clauses.push('brand = @brand')
    params.brand = filters.brand
  }
  if (filters.type) {
    clauses.push('type = @type')
    params.type = filters.type
  }
  if (!filters.status || filters.status === 'active') {
    clauses.push('active = 1')
  } else if (filters.status === 'archived') {
    clauses.push('active = 0')
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
  const rows = db
    .prepare(`SELECT * FROM pricebook_items ${where} ORDER BY name COLLATE NOCASE ASC`)
    .all(params) as Row[]
  return rows.map(rowToItem)
}

export function getItem(id: string): PricebookItem | null {
  const row = db.prepare('SELECT * FROM pricebook_items WHERE id = ?').get(id) as Row | undefined
  return row ? rowToItem(row) : null
}

export function createItem(input: PricebookItemInput): string {
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  db.prepare(
    `INSERT INTO pricebook_items
      (id, reference, name, type, category, brand, model, unit, cost_price, sell_price, vat_rate, supplier, description, specs, active, created_at, updated_at)
     VALUES
      (@id, @reference, @name, @type, @category, @brand, @model, @unit, @costPrice, @sellPrice, @vatRate, @supplier, @description, @specs, @active, @createdAt, @updatedAt)`
  ).run({
    id,
    reference: input.reference,
    name: input.name,
    type: input.type,
    category: input.category,
    brand: input.brand,
    model: input.model,
    unit: input.unit,
    costPrice: input.costPrice,
    sellPrice: input.sellPrice,
    vatRate: input.vatRate,
    supplier: input.supplier,
    description: input.description,
    specs: JSON.stringify(input.specs),
    active: input.active ? 1 : 0,
    createdAt: now,
    updatedAt: now,
  })
  return id
}

export function updateItem(id: string, input: PricebookItemInput): void {
  const now = new Date().toISOString()
  db.prepare(
    `UPDATE pricebook_items SET
      reference = @reference,
      name = @name,
      type = @type,
      category = @category,
      brand = @brand,
      model = @model,
      unit = @unit,
      cost_price = @costPrice,
      sell_price = @sellPrice,
      vat_rate = @vatRate,
      supplier = @supplier,
      description = @description,
      specs = @specs,
      active = @active,
      updated_at = @updatedAt
     WHERE id = @id`
  ).run({
    id,
    reference: input.reference,
    name: input.name,
    type: input.type,
    category: input.category,
    brand: input.brand,
    model: input.model,
    unit: input.unit,
    costPrice: input.costPrice,
    sellPrice: input.sellPrice,
    vatRate: input.vatRate,
    supplier: input.supplier,
    description: input.description,
    specs: JSON.stringify(input.specs),
    active: input.active ? 1 : 0,
    updatedAt: now,
  })
}

export function deleteItem(id: string): void {
  db.prepare('DELETE FROM pricebook_items WHERE id = ?').run(id)
}

export function distinctCategories(): string[] {
  const rows = db
    .prepare('SELECT DISTINCT category FROM pricebook_items WHERE category != \'\' ORDER BY category COLLATE NOCASE')
    .all() as { category: string }[]
  return rows.map((r) => r.category)
}

export function distinctBrands(): string[] {
  const rows = db
    .prepare('SELECT DISTINCT brand FROM pricebook_items WHERE brand != \'\' ORDER BY brand COLLATE NOCASE')
    .all() as { brand: string }[]
  return rows.map((r) => r.brand)
}

export interface DashboardStats {
  totalActive: number
  totalArchived: number
  catalogValue: number
  averageMarginPercent: number | null
  byCategory: { category: string; count: number; value: number }[]
  byBrand: { brand: string; count: number }[]
}

export function getDashboardStats(): DashboardStats {
  const active = listItems({ status: 'active' })
  const archivedCountRow = db
    .prepare('SELECT COUNT(*) as c FROM pricebook_items WHERE active = 0')
    .get() as { c: number }

  const catalogValue = active.reduce((sum, item) => sum + item.sellPrice, 0)
  const margins = active
    .filter((i) => i.costPrice > 0)
    .map((i) => ((i.sellPrice - i.costPrice) / i.costPrice) * 100)
  const averageMarginPercent = margins.length
    ? margins.reduce((a, b) => a + b, 0) / margins.length
    : null

  const categoryMap = new Map<string, { count: number; value: number }>()
  const brandMap = new Map<string, number>()
  for (const item of active) {
    const cat = categoryMap.get(item.category) ?? { count: 0, value: 0 }
    cat.count += 1
    cat.value += item.sellPrice
    categoryMap.set(item.category, cat)

    if (item.brand) {
      brandMap.set(item.brand, (brandMap.get(item.brand) ?? 0) + 1)
    }
  }

  const byCategory = Array.from(categoryMap.entries())
    .map(([category, v]) => ({ category, ...v }))
    .sort((a, b) => b.count - a.count)
  const byBrand = Array.from(brandMap.entries())
    .map(([brand, count]) => ({ brand, count }))
    .sort((a, b) => b.count - a.count)

  return {
    totalActive: active.length,
    totalArchived: archivedCountRow.c,
    catalogValue,
    averageMarginPercent,
    byCategory,
    byBrand,
  }
}
