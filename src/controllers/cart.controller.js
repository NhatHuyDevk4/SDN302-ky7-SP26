import { addToCartServices, getCartByUserIdService, removeFromCartServices } from "../services/cart.service.js";
import { ok } from "../utils/response.js";


export const addTocart = async (req, res) => {
    try {
        const userId = req.user._id;
        const response = await addToCartServices(userId, req.body);
        return ok(res, response, "Thêm sản phẩm vào giỏ hàng thành công", 200);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const removeCartItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.body;
        // Gọi service để xóa sản phẩm khỏi giỏ hàng
        const response = await removeFromCartServices(userId, productId);
        return ok(res, response, "Xóa sản phẩm khỏi giỏ hàng thành công", 200);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export const getCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const response = await getCartByUserIdService(userId);
        return ok(res, response, "Lấy giỏ hàng thành công", 200);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


