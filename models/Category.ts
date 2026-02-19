import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    slug: string;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
}, {
    timestamps: true,
});

// Create slug from name before validation
CategorySchema.pre('validate', async function () {
    if (this.isModified('name')) {
        const category = this as unknown as ICategory;
        category.slug = category.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
});

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
