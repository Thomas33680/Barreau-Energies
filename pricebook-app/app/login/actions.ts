'use server'

import { redirect } from 'next/navigation'
import { createSession, destroySession } from '@/lib/auth'
import { verifyPassword } from '@/lib/session'

export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '')
  const nextParam = String(formData.get('next') ?? '/')
  const safeNext = nextParam.startsWith('/') ? nextParam : '/'

  if (!verifyPassword(password)) {
    redirect(`/login?error=1&next=${encodeURIComponent(safeNext)}`)
  }

  await createSession()
  redirect(safeNext)
}

export async function logout() {
  await destroySession()
  redirect('/login')
}
