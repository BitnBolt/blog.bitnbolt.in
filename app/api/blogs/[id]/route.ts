import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { cookies } from 'next/headers';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectToDatabase();
    try {
        const { id } = await params;
        const blog = await Blog.findById(id);
        if (!blog) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true, data: blog });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token');
        if (!token || token.value !== 'authenticated') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await connectToDatabase();
        const body = await req.json();
        const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        if (!blog) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

        return NextResponse.json({ success: true, data: blog });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token');
        if (!token || token.value !== 'authenticated') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await connectToDatabase();
        const deletedBlog = await Blog.deleteOne({ _id: id });

        if (!deletedBlog) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
