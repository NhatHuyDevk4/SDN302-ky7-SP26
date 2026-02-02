import { createCategory, deleteCategory, getDetailCategory, listCategories, updateCategory } from "../services/category.service.js";
import { ok } from "../utils/response.js";


export const createCategoryService = async (req, res) => {
    const category = await createCategory(req.body);
    return ok(res, category, "Tạo danh mục thành công", 201);
}

export const getListCategory = async (req, res) => {
    const categories = await listCategories();
    return ok(res, categories, "Lấy danh sách danh mục thành công", 200);
}

export const updateCategoryService = async (req, res) => {
    const categoryId = req.params.categoryId;
    const category = await updateCategory(categoryId, req.body);
    return ok(res, category, "Cập nhật danh mục thành công", 200);
}

export const deleteCategoryService = async (req, res) => {
    const categoryId = req.params.categoryId;
    const category = await deleteCategory(categoryId);
    return ok(res, category, "Xóa danh mục thành công", 200);
}

export const getDetailCategoryService = async (req, res) => {
    const categoryId = req.params.categoryId;
    const category = await getDetailCategory(categoryId);
    return ok(res, category, "Lấy chi tiết danh mục thành công", 200);
}