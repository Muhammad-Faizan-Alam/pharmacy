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
  if (token) {
    const decoded = decodeJwtPayload(token);
    isAdmin = decoded?.isAdmin;
  }

  // Restrict admin routes
  if (isAdminPath && (!token || !isAdmin)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  } else if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else {
    return NextResponse.next();
  }
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