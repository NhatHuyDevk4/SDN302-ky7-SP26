import { getMyInfoService, loginService, registerService } from "../services/auth.service.js";
import { ok } from "../utils/response.js";

export const register = async (req, res) => {
    const result = await registerService(req.body);
    return ok(res, result, "Tài khoản đã được tạo thành công", 201);
}

export const login = async (req, res) => {
    const result = await loginService(req.body);
    return ok(res, result, "Đăng nhập thành công", 200);
}


export const getMyInfo = async (req, res) => {
    console.log("Req user id", req.user);
    const userId = req.user._id;
    const result = await getMyInfoService(userId);
    return ok(res, result, "Lấy thông tin người dùng thành công", 200);
}


// export const login = async (req, res) => {
//     const result = await loginService(req.body);
//     return ok(res, result, "Đăng nhập thành công", 200);
// }