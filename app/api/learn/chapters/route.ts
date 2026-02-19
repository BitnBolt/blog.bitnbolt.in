import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { LearnChapter } from '@/models/Learn';

export async function GET() {
    try {
        await connectToDatabase();
        const chapters = await LearnChapter.find({}).sort({ order: 1 });
        return NextResponse.json(chapters);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { title, description } = await req.json();

        // Find max order
        const lastChapter = await LearnChapter.findOne().sort({ order: -1 });
        const order = lastChapter ? lastChapter.order + 1 : 0;

        const chapter = await LearnChapter.create({ title, description, order });
        return NextResponse.json(chapter);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create chapter' }, { status: 500 });
    }
}
