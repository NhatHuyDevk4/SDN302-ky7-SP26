import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database", error);
        process.exit(1);
        // nếu thất bại thì exit với mã lỗi 1
    }
}

export default connectDB;


// DATABASE
// ===> Database là nơi lưu trữ dữ liệu của ứng dụng, trên thị trường có rất nhiều loại database khác nhau
// ===> Các loại database phổ biến:
// 1. Relational Database (Database quan hệ):
// - MySQL, PostgreSQL, Oracle, SQL Server, ...
// - Database quan hệ là database mà dữ liệu được lưu trữ dưới dạng bảng, và các bảng này có quan hệ với nhau
// - Các bảng trong database quan hệ có thể có quan hệ với nhau thông qua các khóa ngoại
// - Các bảng trong database quan hệ có thể có quan hệ với nhau thông qua các khóa chính
// - Các bảng trong database quan hệ có thể có quan hệ với nhau thông qua các khóa ngoại

// 2. NoSQL Database (Database không quan hệ):
// - MongoDB, CouchDB, Redis, ...
// - Database không quan hệ là database mà dữ liệu được lưu trữ dưới dạng document, và các document này có thể có quan hệ với nhau
// - Các document trong database không quan hệ có thể có quan hệ với nhau thông qua các khóa ngoại
// - Các document trong database không quan hệ có thể có quan hệ với nhau thông qua các khóa chính
// - Các document trong database không quan hệ có thể có quan hệ với nhau thông qua các khóa ngoại

// MongoDB là một NoSQL Database
// ==> là một cơ sở dữ liệu NoSql dạng document(tài liệu)

// Schema là gì
// ==> Schema là bản thiết kế (Khuôn mẫu) mô tả cấu trúc dữ liệu
// ==> Quy định có những trường nào, kiểu dữ liệu gì, bắc buộc hay không
// Nếu mà ko có bản vẽ ==> mỗi người xây mỗi kiểu ==> loạn

// Schema trong database là gì 
// Schema mô tả :
// Kiểu dữ liệu (String, number, date)
// Bắc buộc hay không
// có unique không
// có default value không...