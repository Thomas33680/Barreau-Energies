import { computeMargin } from '@/lib/types'
import { formatCurrency, formatPercent } from '@/lib/format'

export function marginTone(percent: number | null): 'good' | 'warning' | 'critical' | 'neutral' {
  if (percent === null) return 'neutral'
  if (percent < 10) return 'critical'
  if (percent < 25) return 'warning'
  return 'good'
}

const toneClasses: Record<string, string> = {
  good: 'bg-good-bg text-good-text',
  warning: 'bg-warning-bg text-warning-text',
  critical: 'bg-critical-bg text-critical-text',
  neutral: 'bg-surface-hover text-foreground-secondary',
}

export function MarginBadge({ costPrice, sellPrice }: { costPrice: number; sellPrice: number }) {
  const { amount, percent } = computeMargin(costPrice, sellPrice)
  const tone = marginTone(percent)

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
      title="Marge = prix de vente − prix d'achat"
    >
      {formatCurrency(amount)}
      {percent !== null && <span className="opacity-80">· {formatPercent(percent)}</span>}
    </span>
  )
}
