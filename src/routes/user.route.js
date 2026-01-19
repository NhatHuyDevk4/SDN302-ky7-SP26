import express from "express";
import UserModel from "../models/user.model.js";
const router = express();

router.get("/search", (request, response) => {
    response.send("Hello World 2");
})
router.get("/", (request, response) => {
    response.send("Hello World 2");
})
router.post("/", async (request, response) => {
    const { name, email, password } = request.body;

    try {
        const user = await UserModel.create({ name, email, password });
        ok(user, "Tài khoản đã được tạo thành công", 201);
    } catch (error) {
        response.status(500).send({
            status: "error",
            message: "Lỗi khi tạo tài khoản",
            error: error.message,
        });
    }
})
router.put("/:id", (request, response) => {
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
router.delete("/:id", (request, response) => {
    const { id } = request.params;
    console.log("ID của người dùng 2333", id);
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

export default router;