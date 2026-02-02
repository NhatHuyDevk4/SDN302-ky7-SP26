import slugify from "slugify";
import Categories from "../models/categories.model.js";


// Create

export const createCategory = async (data) => {
    if (!data.name) {
        throw new Error("Tên danh mục không được để trống");
    }
    const name = data.name.trim();
    const exists = await Categories.findOne({ name });
    if (exists) {
        throw new Error("Danh mục đã tồn tại");
    }

    const slug = slugify(name, { lower: true, strict: true, locale: 'vi' });

    const newCategory = await Categories.create({
        name,
        slug
    })

    return newCategory;
}

// Get list
export const listCategories = async () => {
    // pagination 
    const categories = await Categories.find().sort('-createdAt');
    return categories;
}

export const updateCategory = async (categoryId, data) => {
    const category = await Categories.findById(categoryId);
    if (!category) {
        throw new Error("Danh mục không tồn tại");
    }
    data.name = data.name.trim();
    category.name = data.name;
    category.slug = slugify(data.name, { lower: true, strict: true, locale: 'vi' });
    await category.save();
    return category;
}

export const deleteCategory = async (categoryId) => {
    const category = await Categories.findByIdAndDelete(categoryId);
    if (!category) {
        throw new Error("Danh mục không tồn tại");
    }
    return category;
}

export const getDetailCategory = async (categoryId) => {
    const category = await Categories.findById(categoryId);
    if (!category) {
        throw new Error("Danh mục không tồn tại");
    }
    return category;
}