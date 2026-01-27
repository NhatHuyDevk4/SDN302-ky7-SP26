import userModel from "../models/user.model.js";
import { verifyToken } from "../utils/jwt.js";

export const protect = async (req, res, next) => {
    try {
        // B1: Lấy token từ header
        // req.headers.authorization là giá trị của header Authorization mà client gửi lên server
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader.split(" ")[1];
        console.log("Token nhận được từ client", token);
        // B2: Verify token
        const decoded = verifyToken(token);
        const user = await userModel.findById(decoded.id).select("-password -__v");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
}