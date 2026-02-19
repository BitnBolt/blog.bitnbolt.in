import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { LearnChapter, LearnModule } from '@/models/Learn';

export async function GET() {
    try {
        await connectToDatabase();
        const chapters = await LearnChapter.find({}).sort({ order: 1 }).lean();
        const modules = await LearnModule.find({}).sort({ order: 1 }).lean();

        const fullCurriculum = chapters.map(chapter => ({
            ...chapter,
            id: chapter._id.toString(),
            modules: modules
                .filter(module => module.chapterId.toString() === chapter._id.toString())
                .map(m => ({ ...m, id: m._id.toString() }))
        }));

        return NextResponse.json(fullCurriculum);
    } catch (error) {
        console.error("Error fetching learn content: ", error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
