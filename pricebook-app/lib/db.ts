import { Pool, type QueryResultRow } from 'pg'
import crypto from 'node:crypto'
import type { PricebookItem, PricebookItemInput } from './types'

const globalForDb = globalThis as unknown as { pgPool?: Pool }

function getPool(): Pool {
  if (globalForDb.pgPool) return globalForDb.pgPool

  // Different Postgres integrations (Neon, Vercel Postgres, Supabase…) name the
  // injected connection string differently — accept the common variants.
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.DATABASE_URL_UNPOOLED
  if (!connectionString) {
    throw new Error(
      "Aucune chaîne de connexion PostgreSQL trouvée (DATABASE_URL). Ajoutez-la dans .env.local en local, ou dans les variables d'environnement du projet sur votre hébergeur."
    )
  }
  const isLocal = /localhost|127\.0\.0\.1/.test(connectionString)
  const pool = new Pool({
    connectionString,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  })
  globalForDb.pgPool = pool
  return pool
}

async function query<T extends QueryResultRow>(text: string, params: unknown[] = []) {
  return getPool().query<T>(text, params)
}

let schemaReady: Promise<void> | null = null
function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await query(`
        CREATE TABLE IF NOT EXISTS pricebook_items (
          id TEXT PRIMARY KEY,
          reference TEXT NOT NULL DEFAULT '',
          name TEXT NOT NULL,
          type TEXT NOT NULL DEFAULT 'produit',
          category TEXT NOT NULL,
          brand TEXT NOT NULL DEFAULT '',
          model TEXT NOT NULL DEFAULT '',
          unit TEXT NOT NULL DEFAULT 'pièce',
          cost_price DOUBLE PRECISION NOT NULL DEFAULT 0,
          sell_price DOUBLE PRECISION NOT NULL DEFAULT 0,
          vat_rate DOUBLE PRECISION NOT NULL DEFAULT 20,
          supplier TEXT NOT NULL DEFAULT '',
          description TEXT NOT NULL DEFAULT '',
          specs JSONB NOT NULL DEFAULT '[]',
          active BOOLEAN NOT NULL DEFAULT true,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
      `)
      await query('CREATE INDEX IF NOT EXISTS idx_pricebook_category ON pricebook_items(category);')
      await query('CREATE INDEX IF NOT EXISTS idx_pricebook_brand ON pricebook_items(brand);')
    })()
  }
  return schemaReady
}

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
  specs: unknown
  active: boolean
  created_at: string
  updated_at: string
}

function rowToItem(row: Row): PricebookItem {
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
    specs: Array.isArray(row.specs) ? (row.specs as PricebookItem['specs']) : [],
    active: row.active,
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

export async function listItems(filters: ItemFilters = {}): Promise<PricebookItem[]> {
  await ensureSchema()

  const clauses: string[] = []
  const params: unknown[] = []
  const addParam = (value: unknown) => {
    params.push(value)
    return `$${params.length}`
  }

  if (filters.search) {
    const p = addParam(`%${filters.search}%`)
    clauses.push(
      `(name ILIKE ${p} OR reference ILIKE ${p} OR brand ILIKE ${p} OR model ILIKE ${p} OR description ILIKE ${p})`
    )
  }
  if (filters.category) clauses.push(`category = ${addParam(filters.category)}`)
  if (filters.brand) clauses.push(`brand = ${addParam(filters.brand)}`)
  if (filters.type) clauses.push(`type = ${addParam(filters.type)}`)

  if (!filters.status || filters.status === 'active') {
    clauses.push('active = true')
  } else if (filters.status === 'archived') {
    clauses.push('active = false')
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
  const result = await query<Row>(
    `SELECT * FROM pricebook_items ${where} ORDER BY LOWER(name) ASC`,
    params
  )
  return result.rows.map(rowToItem)
}

export async function getItem(id: string): Promise<PricebookItem | null> {
  await ensureSchema()
  const result = await query<Row>('SELECT * FROM pricebook_items WHERE id = $1', [id])
  return result.rows[0] ? rowToItem(result.rows[0]) : null
}

export async function createItem(input: PricebookItemInput): Promise<string> {
  await ensureSchema()
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  await query(
    `INSERT INTO pricebook_items
      (id, reference, name, type, category, brand, model, unit, cost_price, sell_price, vat_rate, supplier, description, specs, active, created_at, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
    [
      id,
      input.reference,
      input.name,
      input.type,
      input.category,
      input.brand,
      input.model,
      input.unit,
      input.costPrice,
      input.sellPrice,
      input.vatRate,
      input.supplier,
      input.description,
      JSON.stringify(input.specs),
      input.active,
      now,
      now,
    ]
  )
  return id
}

export async function updateItem(id: string, input: PricebookItemInput): Promise<void> {
  await ensureSchema()
  const now = new Date().toISOString()
  await query(
    `UPDATE pricebook_items SET
      reference = $1, name = $2, type = $3, category = $4, brand = $5, model = $6, unit = $7,
      cost_price = $8, sell_price = $9, vat_rate = $10, supplier = $11, description = $12,
      specs = $13, active = $14, updated_at = $15
     WHERE id = $16`,
    [
      input.reference,
      input.name,
      input.type,
      input.category,
      input.brand,
      input.model,
      input.unit,
      input.costPrice,
      input.sellPrice,
      input.vatRate,
      input.supplier,
      input.description,
      JSON.stringify(input.specs),
      input.active,
      now,
      id,
    ]
  )
}

export async function deleteItem(id: string): Promise<void> {
  await ensureSchema()
  await query('DELETE FROM pricebook_items WHERE id = $1', [id])
}

export async function distinctCategories(): Promise<string[]> {
  await ensureSchema()
  const result = await query<{ category: string }>(
    "SELECT DISTINCT category FROM pricebook_items WHERE category != '' ORDER BY category"
  )
  return result.rows.map((r) => r.category)
}

export async function distinctBrands(): Promise<string[]> {
  await ensureSchema()
  const result = await query<{ brand: string }>(
    "SELECT DISTINCT brand FROM pricebook_items WHERE brand != '' ORDER BY brand"
  )
  return result.rows.map((r) => r.brand)
}

export interface DashboardStats {
  totalActive: number
  totalArchived: number
  catalogValue: number
  averageMarginPercent: number | null
  byCategory: { category: string; count: number; value: number }[]
  byBrand: { brand: string; count: number }[]
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await ensureSchema()
  const active = await listItems({ status: 'active' })
  const archivedResult = await query<{ c: string }>(
    'SELECT COUNT(*) as c FROM pricebook_items WHERE active = false'
  )
  const totalArchived = Number(archivedResult.rows[0]?.c ?? 0)

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
    totalArchived,
    catalogValue,
    averageMarginPercent,
    byCategory,
    byBrand,
  }
}
