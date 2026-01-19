import userModel from "../models/user.model.js";
import { hashPassword } from "../utils/hash.js";


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

}