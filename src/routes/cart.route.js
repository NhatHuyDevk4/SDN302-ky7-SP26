import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { userLimiter } from "../middlewares/rateLimit.middleware.js";
import { addTocart, getCart, removeCartItem } from "../controllers/cart.controller.js";

const router = express();


// [GET] /api/cart
router.get("/", protect, getCart)

// [POST] /api/cart
router.post("/add", protect, addTocart)

// [DELETE] /api/cart/remove
router.delete("/remove", protect, removeCartItem)


export default router;