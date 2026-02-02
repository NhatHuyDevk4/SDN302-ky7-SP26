import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { create, list } from "../controllers/product.controller.js";

const router = express();

router.get("/", list)

router.post("/", protect, create)

export default router;