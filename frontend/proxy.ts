import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Ignore static assets, api routes, and the login page itself
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname === '/login' ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // In a real app we'd check cookies. For demo, we just ensure 
    // the root goes to login, or dashboard goes to login if not bypassed by client.
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
