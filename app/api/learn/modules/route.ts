import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { LearnModule } from '@/models/Learn';

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { title, content, chapterId } = await req.json();

        // Find max order
        const lastModule = await LearnModule.findOne({ chapterId }).sort({ order: -1 });
        const order = lastModule ? lastModule.order + 1 : 0;

        const module = await LearnModule.create({ title, content, chapterId, order });
        return NextResponse.json(module);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create module' }, { status: 500 });
    }
}
