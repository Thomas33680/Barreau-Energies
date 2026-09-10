import crypto from 'node:crypto'

export const SESSION_COOKIE = 'barreau_session'
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30 // 30 days

function getSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error(
      "AUTH_SECRET n'est pas défini. Ajoutez une valeur secrète dans votre fichier .env.local (voir .env.example)."
    )
  }
  return secret
}

function sign(value: string): string {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('hex')
}

/** Builds a signed session token: `<issuedAt>.<hmac>`. Stateless, no server-side session store needed. */
export function createSessionToken(): string {
  const issuedAt = Date.now().toString()
  return `${issuedAt}.${sign(issuedAt)}`
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false
  const [issuedAt, signature] = token.split('.')
  if (!issuedAt || !signature) return false

  const expected = sign(issuedAt)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  if (!crypto.timingSafeEqual(a, b)) return false

  const age = Date.now() - Number(issuedAt)
  return age >= 0 && age <= SESSION_MAX_AGE_SECONDS * 1000
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.APP_PASSWORD
  if (!expected) {
    throw new Error(
      "APP_PASSWORD n'est pas défini. Ajoutez un mot de passe dans votre fichier .env.local (voir .env.example)."
    )
  }
  const a = Buffer.from(candidate)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}
