import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        await connectToDatabase();
        const blogs = await Blog.find({}, { content: 0 }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function POST(req: Request) {
    try {
        // Check auth
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token');

        if (!token || token.value !== 'authenticated') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const body = await req.json();
        const blog = await Blog.create(body);
        return NextResponse.json({ success: true, data: blog }, { status: 201 });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ success: false, message: 'Failed to create blog' }, { status: 400 });
    }
}
