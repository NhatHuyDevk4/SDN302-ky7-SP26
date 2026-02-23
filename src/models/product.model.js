import mongoose, { Types } from "mongoose";

// Không cần thêm id vì MongoDB sẽ tự động tạo id cho mỗi document
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // bắc buộc phải có
        trim: true, // xóa khoảng trắng ở đầu và cuối
    },
    slug: {
        type: String,
        unique: true,
        // required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    description: {
        type: String
    },
    images: [
        {
            type: String,
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true, // tự động tạo createdAt và updatedAt
});

export default mongoose.model("Product", productSchema, "products");
