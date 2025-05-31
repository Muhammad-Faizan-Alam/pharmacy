import { NextResponse } from 'next/server'
import React from 'react'

const middleware = (request) => {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/reset-password';
    const token = request.cookies.get('token')?.value || '';
    console.log('Middleware token:', token);

    // Allow all users to access admin routes, regardless of isAdmin
    // (If you want to restrict, you would need to decode the token and check isAdmin)

    if (token && isPublicPath) {
        // User is authenticated, allow access to the requested path
        return NextResponse.redirect(new URL('/', request.url));
    } else if (!token && !isPublicPath) {
        // User is not authenticated, redirect to login page
        return NextResponse.redirect(new URL('/login', request.url));
    } else {
        // If the user is authenticated and accessing a public path, allow access
        return NextResponse.next();
    }
}

export default middleware;

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)', // Exclude API routes and static files
        '/login',
        '/signup',
        '/verifyemail',
        // '/'
    ],
}