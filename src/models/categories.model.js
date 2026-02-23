import mongoose from "mongoose";

// Không cần thêm id vì MongoDB sẽ tự động tạo id cho mỗi document
const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // bắc buộc phải có
        trim: true, // xóa khoảng trắng ở đầu và cuối
    },
    slug: { // Sau này dùng cho SEO/URL
        type: String,
        unique: true,
        required: true,
        trim: true, // xóa khoảng trắng ở đầu và cuối
        lowercase: true, // chuyển về chữ thường
    }
}, {
    timestamps: true, // tự động tạo createdAt và updatedAt
});

export default mongoose.model("Categories", categoriesSchema, "categories");
