import {
  createProduct,
  deleteProductByIdService,
  getProductByIdService,
  getProductBySlugService,
  listProducts,
  updateStatusProductByIdService,
  updateStatusProductBySlugService,
} from "../services/product.service.js";
import { ok } from "../utils/response.js";

export const list = async (req, res) => {
  console.log("Query params:", req.query);
  const result = await listProducts(req.query);
  return ok(res, result, "Lấy danh sách sản phẩm thành công", 200);
};

export const getProductBySlug = async (req, res) => {
  console.log("Params:", req.params.slug);
  const slug = req.params.slug;
  const product = await getProductBySlugService(slug);
  return ok(res, product, "Lấy chi tiết sản phẩm thành công", 200);
};

export const updateStatusProduct = async (req, res) => {
  const productId = req.params.id;
  const { isActive } = req.body;
  const product = await updateStatusProductByIdService(productId, isActive);
  return ok(res, product, "Cập nhật trạng thái sản phẩm thành công", 200);
};

export const updateStatusProductBySlug = async (req, res) => {
  console.log("Role", req.user.role);
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Bạn không có quyền cập nhập sản phẩm" });
  }
  const slug = req.params.slug;
  const { isActive } = req.body;
  const product = await updateStatusProductBySlugService(slug, isActive);
  return ok(res, product, "Cập nhật trạng thái sản phẩm thành công", 200);
};

export const create = async (req, res) => {
  const product = await createProduct(req.body);
  return ok(res, product, "Tạo sản phẩm thành công", 201);
};

export const getProductById = async (req, res) => {
  console.log("Params:", req.params);
  const productId = req.params.id;
  const product = await getProductByIdService(productId);
  return ok(res, product, "Lấy chi tiết sản phẩm thành công", 200);
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await deleteProductByIdService(productId);
  return ok(res, product, "Xóa sản phẩm thành công", 200);
};
