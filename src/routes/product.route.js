import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import {
    create,
    deleteProduct,
    getProductById,
    getProductBySlug,
    list,
    updateStatusProductBySlug,
} from "../controllers/product.controller.js";
import { limiter, userLimiter } from "../middlewares/rateLimit.middleware.js";

const router = express();

// [GET] /api/products
router.get("/", userLimiter, list);

// [POST] /api/products
router.post("/", protect, create);

// [PUT] /api/products/:slug/status - Đặt route cụ thể lên trước
router.put("/:slug/status", protect, userLimiter, updateStatusProductBySlug);

// [GET] /api/products/:slug
router.get("/:slug", getProductBySlug);

// [GET] /api/products/:id
router.get("/:id", getProductById);

// [DELETE] /api/products/:id
router.delete("/:id", protect, deleteProduct);

export default router;
