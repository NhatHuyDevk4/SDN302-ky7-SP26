import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { create, deleteProduct, getProductById, list } from "../controllers/product.controller.js";



const router = express();

router.get("/", list)

router.post("/", protect, create)

router.get("/:id", getProductById)

router.delete("/:id", protect, deleteProduct)

export default router;