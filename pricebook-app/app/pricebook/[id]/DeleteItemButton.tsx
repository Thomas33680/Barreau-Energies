'use client'

import { useTransition } from 'react'

export function DeleteItemButton({ action }: { action: () => Promise<void> }) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm('Supprimer définitivement cet article du pricebook ? Cette action est irréversible.')) {
          startTransition(() => {
            action()
          })
        }
      }}
      className="rounded-lg border border-critical-text/30 px-3 py-1.5 text-sm text-critical-text hover:bg-critical-bg disabled:opacity-60"
    >
      {pending ? 'Suppression…' : 'Supprimer'}
    </button>
  )
}
