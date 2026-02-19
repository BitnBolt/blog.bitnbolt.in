import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    shortDescription: string;
    content: string;
    category: string;
    tags: string[];
    level: 'Easy' | 'Medium' | 'Hard';
    image: string;
    readTime: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true, maxLength: 200 },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    level: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    image: { type: String, default: 'bg-gradient-to-br from-gray-800 to-black' },
    readTime: { type: String, default: '5 min' },
    slug: { type: String, unique: true },
}, {
    timestamps: true,
});

// Create slug from title before validation
BlogSchema.pre('validate', async function () {
    if (this.isModified('title')) {
        const blog = this as unknown as IBlog;
        blog.slug = blog.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
});

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
