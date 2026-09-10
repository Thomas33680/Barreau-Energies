const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2,
})

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

const numberFormatter = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 })

export function formatPercent(value: number | null): string {
  if (value === null) return '—'
  return `${numberFormatter.format(value)} %`
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(iso))
}
