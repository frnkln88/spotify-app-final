import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    
  const url = req.nextUrl.clone()
  url.pathname = '/login'
  // token is valid if user is authenticated
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const { pathname } = req.nextUrl

  // Request goes through if the following is true:
  // 1) request is sent to next-auth session
  // 2) a valid token exists

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if (!token && pathname !== url.pathname) {
    return NextResponse.rewrite(url)
  }
}