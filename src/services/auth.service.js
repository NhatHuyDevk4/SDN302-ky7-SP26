import userModel from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hash.js";


export const registerService = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw new Error("Name, email and password are required");
    }
    const exists = await userModel.findOne({ email });
    if (exists) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await hashPassword(password);
    const user = await userModel.create({ name, email, password: hashedPassword });
    return user;
}


export const loginService = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    // Check là user này có tồn tại trong database hay không
    const user = await userModel.findOne({ email });
    console.log("Data tìm được", user);
    if (!user) { // không tìm thấy user
        throw new Error("User not found");
    }
    // nếu tìm thấy user, so sánh password
    const isMath = await comparePassword(password, user.password);
    console.log("Kết quả so sánh mật khẩu", isMath);
    if (!isMath) {
        throw new Error("Invalid password");
    }
    return user;
}

// có nhiều loại find
// findOne: tìm một tài liệu
// findById: tìm theo id
// find(): tìm nhiều tài liệu