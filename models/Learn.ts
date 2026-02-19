import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ILearnChapter extends Document {
    title: string;
    description: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILearnModule extends Document {
    title: string;
    content: string; // Rich Text HTML
    chapterId: mongoose.Types.ObjectId;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const LearnChapterSchema = new Schema<ILearnChapter>(
    {
        title: { type: String, required: true },
        description: { type: String },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const LearnModuleSchema = new Schema<ILearnModule>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        chapterId: { type: Schema.Types.ObjectId, ref: 'LearnChapter', required: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const LearnChapter = models.LearnChapter || model<ILearnChapter>('LearnChapter', LearnChapterSchema);
export const LearnModule = models.LearnModule || model<ILearnModule>('LearnModule', LearnModuleSchema);
