import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { login } from './actions'

export const metadata = {
  title: 'Connexion — Barreau Énergies',
}

export default async function LoginPage({ searchParams }: PageProps<'/login'>) {
  const params = await searchParams
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next
  const next = rawNext && rawNext.startsWith('/') ? rawNext : '/'
  const hasError = params.error !== undefined

  if (await isAuthenticated()) {
    redirect(next)
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-sm"
      >
        <input type="hidden" name="next" value={next} />
        <h1 className="text-lg font-semibold">Barreau Énergies</h1>
        <p className="mt-1 text-sm text-foreground-secondary">
          Application interne — connectez-vous pour continuer.
        </p>

        {hasError && (
          <p className="mt-4 rounded-lg bg-critical-bg px-3 py-2 text-sm text-critical-text">
            Mot de passe incorrect.
          </p>
        )}

        <label className="mt-6 block text-sm font-medium">
          Mot de passe
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="mt-1.5 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
          />
        </label>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          Se connecter
        </button>
      </form>
    </main>
  )
}
