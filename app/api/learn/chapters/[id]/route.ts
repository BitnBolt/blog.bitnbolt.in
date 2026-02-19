import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { LearnChapter, LearnModule } from '@/models/Learn';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();

        const body = await req.json();

        await LearnChapter.findByIdAndUpdate(id, body);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();

        // Cascade DELETE: Delete modules too
        await LearnModule.deleteMany({ chapterId: id });
        await LearnChapter.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
