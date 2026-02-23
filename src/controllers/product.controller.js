
import { createProduct, deleteProductByIdService, getProductByIdService, listProducts } from "../services/product.service.js";
import { ok } from "../utils/response.js";




export const list = async (req, res) => {
    console.log("Query params:", req.query);
    const result = await listProducts(req.query);
    return ok(res, result, "Lấy danh sách sản phẩm thành công", 200);
}

export const create = async (req, res) => {
    const product = await createProduct(req.body);
    return ok(res, product, "Tạo sản phẩm thành công", 201);
}

export const getProductById = async (req, res) => {
    console.log("Params:", req.params);
    const productId = req.params.id;
    const product = await getProductByIdService(productId);
    return ok(res, product, "Lấy chi tiết sản phẩm thành công", 200);
}

export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    const product = await deleteProductByIdService(productId);
    return ok(res, product, "Xóa sản phẩm thành công", 200);
}