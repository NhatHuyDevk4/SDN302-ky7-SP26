import express from "express";
import { getMyInfo, login, register } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express();


router.post("/register", register);

router.post("/login", login)

router.get("/my-info", protect, getMyInfo);
// router.post("/forgot-password", )

// router.post("/reset-password", )

export default router;