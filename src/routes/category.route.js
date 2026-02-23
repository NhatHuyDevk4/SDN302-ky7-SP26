import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createCategoryService, deleteCategoryService, getDetailCategoryService, getListCategory, updateCategoryService } from "../controllers/category.controller.js";


const router = express();

router.get("/", getListCategory)

router.get("/:categoryId", getDetailCategoryService)

router.post("/", protect, createCategoryService)

router.put("/:categoryId", protect, updateCategoryService)

router.delete("/:categoryId", protect, deleteCategoryService)



export default router;