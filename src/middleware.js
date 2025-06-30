import { NextResponse } from 'next/server';

// Minimal JWT decode for payload (no verification, just base64 decode)
function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return {};
  }
}

const middleware = (request) => {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/reset-password';
  const isAdminPath = path.startsWith('/Admin');
  const token = request.cookies.get('token')?.value || '';

  let isAdmin = false;
  let isExpired = false;
  if (token) {
    const decoded = decodeJwtPayload(token);
    
    isAdmin = decoded?.isAdmin;
    // Check for expiration
    if (decoded?.exp) {
      const now = Math.floor(Date.now() / 1000); // current time in seconds
      isExpired = decoded.exp < now;
    }
  }

  // Restrict admin routes
  if (isAdminPath && (!token || !isAdmin || isExpired)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect to login if token is missing or expired and not on public path
  if ((!token || isExpired) && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect logged-in users away from public pages if token is valid and not expired
  if (token && !isExpired && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

export default middleware;

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/login',
    '/signup',
    '/verifyemail',
  ],
};