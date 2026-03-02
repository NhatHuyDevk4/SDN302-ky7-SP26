import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { userLimiter } from "../middlewares/rateLimit.middleware.js";
import { addTocart } from "../controllers/cart.controller.js";

const router = express();

// [POST] /api/cart
router.post("/add", protect, addTocart)


export default router;