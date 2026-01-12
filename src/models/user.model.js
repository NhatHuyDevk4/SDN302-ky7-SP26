import mongoose from "mongoose";

// Không cần thêm id vì MongoDB sẽ tự động tạo id cho mỗi document
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model("User", userSchema, "users");
// Tham số đầu tiên là tên model
// Tham số thứ hai là schema
// Tham số thứ ba là tên collection


// _v: là versionKey do Mongoose tự động tạo ra
// ==> Theo dõi phiển bản của document
// ==> Khi cập nhật document, Mongoose sẽ tự động tăng giá trị của _v

// Giả sử 
// ==> Request A đọc user ==> __v = 1
// ==> Request B đọc user ==> __v = 0