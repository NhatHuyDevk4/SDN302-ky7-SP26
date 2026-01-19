import mongoose from "mongoose";

// Không cần thêm id vì MongoDB sẽ tự động tạo id cho mỗi document
const cartItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
    },
    {
        _id: false, // tránh dữ liệu dữ thừa tối ưu dung lượng
    }
);

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true,
    },
    items: [cartItemSchema]
})

export default mongoose.model("Cart", cartSchema, "carts");
