import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (password === adminPassword) {
            // Set a cookie manually since we are in API route
            // Note: In Next.js 13+ App Router, cookies() is read-only in some contexts but writable inside Server Action or API Route responses. 
            // Actually cookies().set() is available in Server Actions, but in Route Handlers effectively we return Set-Cookie header.
            // Wait, cookies() from next/headers is read-only in Route Handlers for GET, but let's check.
            // Actually better to use response headers.

            const response = NextResponse.json({ success: true });
            response.cookies.set('admin_token', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
