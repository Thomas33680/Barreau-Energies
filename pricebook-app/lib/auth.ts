import { cookies } from 'next/headers'
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, createSessionToken, isValidSessionToken } from './session'

export { verifyPassword } from './session'

export async function createSession() {
  const store = await cookies()
  store.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  })
}

export async function destroySession() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value)
}
