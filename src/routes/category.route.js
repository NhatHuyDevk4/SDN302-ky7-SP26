import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createCategoryService, deleteCategoryService, getDetailCategoryService, getListCategory, updateCategoryService } from "../controllers/category.controller.js";


const router = express();

// [GET] /api/categories
router.get("/", getListCategory)

// [GET] /api/categories/:categoryId
router.get("/:categoryId", getDetailCategoryService)

// [POST] /api/categories
router.post("/", protect, createCategoryService)

// [PUT] /api/categories/:categoryId
router.put("/:categoryId", protect, updateCategoryService)

// [DELETE] /api/categories/:categoryId
router.delete("/:categoryId", protect, deleteCategoryService)



export default router;