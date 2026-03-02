import mongoose from "mongoose";
import productModel from "../models/product.model.js";
import cartModel from "../models/cart.model.js";




export const addToCartServices = async (userId, body, res) => {
    const { productId, quantity } = body;

    try {

        console.log("User ID trong service", userId);
        console.log("Product ID và quantity nhận được từ client", productId, quantity);

        // B1: Validate productId và quantity
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error("productId không hợp lệ");
        }

        // B2: Kiểm tra sản phẩm có tồn tại và còn hàng không
        const product = await productModel.findById(productId);

        // B3: Nếu sản phẩm không tồn tại hoặc đã ngừng kinh doanh, trả về lỗi
        if (!product || !product.isActive) {
            throw new Error("Sản phẩm không tồn tại hoặc đã ngừng kinh doanh");
        }

        // B4: Kiểm tra số lượng sản phẩm trong kho có đủ để thêm vào giỏ hàng không
        if (product.stock < quantity) {
            throw new Error("Số lượng sản phẩm trong kho không đủ để thêm vào giỏ hàng");
        }

        // B5: Tìm giỏ hàng của người dùng, nếu chưa có thì tạo mới
        let cart = await cartModel.findOne({ user: userId });

        // B5.1: Nếu chưa có giỏ hàng, tạo mới
        if (!cart) {
            cart = await cartModel.create({
                user: userId,
                items: [{ product: productId, quantity }]
            })
            return cart.populate("items.product");
        }

        // B5.2: Nếu đã có giỏ hàng, kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        // findIndex sẽ trả về index của phần tử

        if (existingItem) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
            // cart.items[existingItemIndex].quantity += quantity;

            // Kiểm tra số lượng mới có vượt quá số lượng trong kho không
            const newQuantity = existingItem.quantity + quantity;

            // Nếu số lượng mới vượt quá số lượng trong kho, trả về lỗi
            if (newQuantity > product.stock) {
                throw new Error("Số lượng sản phẩm trong kho không đủ để thêm vào giỏ hàng");
            }
            // Cập nhật số lượng mới
            existingItem.quantity = newQuantity;

            // cập nhập stock của sản phẩm
            const updateProduct = await productModel.findOneAndUpdate(
                {
                    _id: productId,
                    stock: { $gte: quantity }
                },
                {
                    $inc: { stock: -quantity }
                },
                {
                    new: true // Trả về document sau khi đã cập nhật
                }
            )
            if(!updateProduct) {
                throw new Error("Cập nhật sản phẩm thất bại, có thể do số lượng trong kho không đủ");
            }
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        return cart.populate("items.product");
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng", error);
        throw error;
    }

}

 //$gte: là toán tử so sánh trong MongoDB, có nghĩa là "lớn hơn hoặc bằng". 
 // Trong trường hợp này, nó được sử dụng để đảm bảo rằng số lượng sản phẩm trong kho (stock) 
 // phải lớn hơn hoặc bằng số lượng mà người dùng muốn thêm vào giỏ hàng (quantity).
 //  Nếu điều kiện này không được thỏan, tức là nếu số lượng sản phẩm trong kho không đủ để đáp ứng yêu cầu của người dùng, 
 // thì thao tác cập nhật sẽ không được thực hiện và có thể trả về lỗi hoặc thông báo cho người dùng biết rằng số lượng sản phẩm không đủ.

 // $inc: là toán tử cập nhật trong MongoDB, được sử dụng để tăng hoặc giảm giá trị của một trường số.