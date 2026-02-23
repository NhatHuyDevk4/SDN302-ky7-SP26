import express from "express";
import { getMyInfo, login, register } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express();

// [POST] /api/auth/register
router.post("/register", register);

// [POST] /api/auth/login
router.post("/login", login)

// [GET] /api/auth/my-info
router.get("/my-info", protect, getMyInfo);

// router.post("/forgot-password", )

// router.post("/reset-password", )

export default router;