import { registerService } from "../services/auth.service.js";
import { ok } from "../utils/response.js";

export const register = async (req, res) => {
    const result = await registerService(req.body);
    return ok(res, result, "Tài khoản đã được tạo thành công", 201);
}

// export const login = async (req, res) => {
//     const result = await loginService(req.body);
//     return ok(res, result, "Đăng nhập thành công", 200);
// }