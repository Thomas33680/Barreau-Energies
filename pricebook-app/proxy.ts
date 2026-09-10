import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE, isValidSessionToken } from './lib/session'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!isValidSessionToken(token)) {
    const loginUrl = new URL('/login', request.url)
    if (pathname !== '/') loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|brands/).*)'],
}
