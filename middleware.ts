import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define paths that are protected
    const isProtectedPath = path.startsWith('/admin/dashboard') || path.startsWith('/admin/editor');

    if (isProtectedPath) {
        const token = request.cookies.get('admin_token')?.value;

        if (!token || token !== 'authenticated') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/dashboard/:path*', '/admin/editor/:path*'],
};
