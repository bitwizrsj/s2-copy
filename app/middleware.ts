import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths (root page has login form, so it's public)
  const isPublicPath = pathname === '/' || pathname.startsWith('/change-password');
  
  // API routes are always accessible
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if route is protected (dashboard routes)
  const isProtectedRoute = pathname.startsWith('/dashboard');

  // Validate token for protected routes
  if (isProtectedRoute) {
    if (!token) {
      // No token, redirect to login (root page)
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Verify token is valid
    try {
      const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
      jwt.verify(token, jwtSecret);
    } catch (error) {
      // Invalid or expired token, redirect to login (root page)
      const response = NextResponse.redirect(new URL('/', request.url));
      // Clear invalid token cookie
      response.cookies.delete('token');
      response.cookies.delete('user');
      return response;
    }
  }

  // Redirect authenticated users away from login page (root page)
  if (pathname === '/' && token) {
    try {
      const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
      jwt.verify(token, jwtSecret);
      // Token is valid, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch {
      // Token is invalid, allow access to login page
      const response = NextResponse.next();
      response.cookies.delete('token');
      response.cookies.delete('user');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /favicon.ico (favicon file)
     * 4. /public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};