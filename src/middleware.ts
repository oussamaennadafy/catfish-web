// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = new URL(request.url).pathname;

  // in home we go to rooms directly
  if (path === "/") {
    return NextResponse.redirect(new URL('/rooms', request.url))
  }
}

// Configure on which paths to run the middleware
export const config = {
  matcher: [
    // Run on all paths except for api, _next, and static files
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)',
  ],
};