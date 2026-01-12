// const express = require("express");
import express from "express";
import mongoose from "mongoose";
const app = express();

app.use(express.json());

// =========== CONNECT TO DATABASE ===========
mongoose.connect("mongodb+srv://lenhathuy9a6_db_user:lenhathuy123123@cluster0.fa1imwy.mongodb.net/?appName=Cluster0").
then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("Error connecting to database", err);
});


app.get("/", (request, response) => {
    response.send("Hello World");
})

app.post("/", (request, response) => {
    const { name, email, password } = request.body;
    console.log(name, email, password);
    response.status(201).send(
        {
            status: "success",
            message: "Tài khoản đã được tạo thành công",
            // data: {
            //     name,
            //     email,
            //     password
            // }
        }
    );
})

app.put("/:id", (request, response) => {
    const { id } = request.params;
    console.log("ID của người dùng", id);
    // check trong database có tồn tại id này không

    if (!id) {
        return response.status(400).send({
            status: "error",
            message: "ID không tồn tại hoặc không hợp lệ",
        })
    } else if (isNaN(id)) {
        return response.status(400).send({
            status: "error",
            message: "ID không tồn tại hoặc không hợp lệ",
        })
    }


    // nếu không có thì trả về status code 404
    /// === > dạy trong buổi sau
    // nếu có thì update thông tin
    // tránh trường hợp hệ thống ko biết ai để update thông tin
    // tránh trường hợp người giống nhau update thông tin của nhau
    const { password } = request.body;
    console.log(password);
    response.status(200).send(
        {
            status: "success",
            message: "Tài khoản đã được cập nhật thành công",
        }
    );
})

app.delete("/:id", (request, response) => {
    const { id } = request.params;
    console.log("ID của người dùng 2", id);
    // check trong database có tồn tại id này không

    if (!id) {
        return response.status(400).send({
            status: "error",
            message: "ID không tồn tại hoặc không hợp lệ",
        })
    } else if (isNaN(id)) {
        return response.status(400).send({
            status: "error",
            message: "ID không tồn tại hoặc không hợp lệ",
        })
    }

    response.status(200).send(
        {
            status: "success",
            message: "Tài khoản đã được xóa thành công",
        }
    );
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


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