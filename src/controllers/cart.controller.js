import { addToCartServices } from "../services/cart.service.js";
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



