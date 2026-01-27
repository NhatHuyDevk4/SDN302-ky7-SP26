import express from "express";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
const app = express();
// ===== MIDDLEWARE =====
app.use(express.json());
// ===== END MIDDLEWARE =====


// ===== ROUTES USER =====
app.use("/api/v1/users", userRoutes)

// ===== ROUTES AUTH =====
app.use("/api/v1/auth", authRoutes)

// ===== END ROUTES USER =====
export default app;




// Mình có tất gồm những phương thức resfultAPI như:
// get, post, put, delete, patch,

// RESTful API là cách thiết kế API theo chuẩn REST để client(web/mobile/app..) giao tiếp với server
// REST = Representational State Transfer là phong cách thiết kế API
// ===> Nó ko phải là công nghệ
// ===> Nó là phong cách thiết kế API
// REST quy định cách tổ chức URL, HTTP method, và response
// =========> RESTful API = API được thiết kế tuân theo nguyên tắc REST

// 4 Nguyên tắc cốt lõi của REST (cần nhớ):
// 1. Resource-based (tài nguyên):
// - API xoay quanh các tài nguyên (resource)
// - Resource là dành tư, không phải động từ vd: user, product, order, ...  http:3000/api/user

// 2. HTTP method nói lên hành động
// Method                          Ý nghĩa
// GET                             Lấy dữ liệu (read data only)
// POST                            Tạo dữ liệu
// PUT                             Cập nhật dữ liệu
// DELETE                          Xóa dữ liệu
// PATCH                           Cập nhật một phần dữ liệu

// 3. Stateless (trạng thái):
// - Mỗi request phải chứa đầy đủ thông tin cần thiết (không dùng session, cookie)
// - Mỗi request là một tác vụ độc lập, không phụ thuộc vào các request trước đó
// ví dụ: profile (Bắc buộc đăng nhập), (post) ==> xem free ko cần đăng nhập

// 4 Chuẩn response:
// - Status code: 200 (Success), 201 (Created), 204 (No content), 400 (Bad request), 401 (Unauthorized), 403 (Forbidden), 404 (Not found), 500 (Internal server error)
// - Message: "Success", "Error", "Not found", "Unauthorized", "Forbidden", "Bad request", "Internal server error"
// - Data: dữ liệu trả về