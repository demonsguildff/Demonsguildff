import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if this is a dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // You would normally check for a session token here
    // For this demo, we'll just redirect to login
    if (!request.cookies.has('auth')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}

