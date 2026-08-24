import type { ClientInfo, Visit } from '../types'

export interface KnownClient {
  key: string
  client: ClientInfo
  visitsCount: number
  lastVisitDate: string
}

function clientKey(client: ClientInfo): string | null {
  const phone = client.telephone.replace(/\s+/g, '')
  if (phone) return `tel:${phone}`
  const email = client.email.trim().toLowerCase()
  if (email) return `mail:${email}`
  if (client.nom.trim()) return `nom:${client.nom.trim().toLowerCase()}|${client.adresse.trim().toLowerCase()}`
  return null
}

export function deriveKnownClients(visits: Visit[]): KnownClient[] {
  const map = new Map<string, KnownClient>()

  for (const visit of visits) {
    if (!visit.client.nom.trim()) continue
    const key = clientKey(visit.client)
    if (!key) continue

    const existing = map.get(key)
    if (!existing || visit.client.dateVisite >= existing.lastVisitDate) {
      map.set(key, {
        key,
        client: visit.client,
        visitsCount: (existing?.visitsCount ?? 0) + 1,
        lastVisitDate: visit.client.dateVisite,
      })
    } else {
      existing.visitsCount += 1
    }
  }

  return Array.from(map.values()).sort((a, b) => b.lastVisitDate.localeCompare(a.lastVisitDate))
}

export function searchKnownClients(clients: KnownClient[], query: string): KnownClient[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return clients.filter(
    (c) =>
      c.client.nom.toLowerCase().includes(q) ||
      c.client.telephone.toLowerCase().includes(q) ||
      c.client.adresse.toLowerCase().includes(q),
  )
}
