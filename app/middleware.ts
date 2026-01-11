import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Role hierarchy for route access
const roleRouteMap: Record<string, string[]> = {
  superadmin: ['/dashboard/superadmin'],
  admin: ['/dashboard/admin'],
  teacher: ['/dashboard/teacher'],
  parent: ['/dashboard/parent'],
  student: ['/dashboard/student'],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const userCookie = request.cookies.get('user')?.value;
  const { pathname } = request.nextUrl;

  // Public paths
  const isPublicPath = pathname === '/';
  
  // API routes are always accessible
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if route is protected (dashboard routes)
  const isProtectedRoute = pathname.startsWith('/dashboard');
  const isChangePasswordRoute = pathname.startsWith('/change-password');

  // For protected routes, check authentication
  if (isProtectedRoute) {
    if (!token || !userCookie) {
      // No token, redirect to login
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      // Parse user data to check role
      const userData = JSON.parse(decodeURIComponent(userCookie));
      const userRole = userData.role;

      // Check if user is accessing correct role dashboard
      const allowedPaths = roleRouteMap[userRole] || [];
      const isAccessingOwnDashboard = allowedPaths.some(path => pathname.startsWith(path));

      if (!isAccessingOwnDashboard) {
        // Redirect to their own dashboard
        return NextResponse.redirect(new URL(`/dashboard/${userRole}`, request.url));
      }

      // Check if password needs to be changed
      if (!userData.isPasswordChanged && !isChangePasswordRoute) {
        return NextResponse.redirect(new URL('/change-password', request.url));
      }
    } catch (error) {
      // Invalid cookie data, redirect to login
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('token');
      response.cookies.delete('user');
      return response;
    }
  }

  // Change password route - needs to be authenticated
  if (isChangePasswordRoute) {
    if (!token || !userCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Redirect authenticated users away from login page
  if (pathname === '/' && token && userCookie) {
    try {
      const userData = JSON.parse(decodeURIComponent(userCookie));
      
      // If password not changed, go to change password
      if (!userData.isPasswordChanged) {
        return NextResponse.redirect(new URL('/change-password', request.url));
      }
      
      // Otherwise go to their dashboard
      return NextResponse.redirect(new URL(`/dashboard/${userData.role}`, request.url));
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
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
