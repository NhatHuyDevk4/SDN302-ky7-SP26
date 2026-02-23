
import Product from "../models/product.model.js";
import Categories from "../models/categories.model.js";
import { parsePagination } from "../utils/pagination.js";



export const listProducts = async (query) => {
    const { page, limit, skip } = parsePagination(query);

    // console.log("Pagination params - page:", page, "limit:", limit, "skip:", skip);
    console.log("Filter params:", query);

    const filter = {};

    // optional: chỉ lấy active
    if (query.isActive !== undefined) {
        filter.isActive = query.isActive === true;
    }

    // search theo keyword (name)
    if (query.keyword) {
        filter.name = { $regex: query.keyword, $options: 'i' }; // i: không phân biệt hoa thường
    }
    // regex là gì?
    // regex là một chuỗi ký tự đặc biệt để mô tả một mẫu tìm kiếm trong văn bản.
    // nó được sử dụng để tìm kiếm, thay thế hoặc xác thực các chuỗi văn bản dựa trên các mẫu cụ thể.

    // filter theo category
    if (query.categoryId) {
        filter.category = query.categoryId;
    }

    const sort = query.sort || '-createdAt'; // mặc định sắp xếp theo mới nhất

    const [items, total] = await Promise.all([
        Product.find(filter)
            .populate('category')
            .sort(sort)
            .skip(skip)
            .limit(limit),
        Product.countDocuments(filter),
        // lấy thông tin category
    ])

    const totalPages = Math.ceil(total / limit);

    return {
        items,
        pagination: {
            page,
            limit,
            total,
            totalPages
        }
    }
}

export const createProduct = async (payload) => {

    // check slug đã tồn tại chưa
    // const existingProduct = await Product.findOne({ slug: payload.slug });
    // if (existingProduct) {
    //     throw new Error('Slug đã tồn tại, vui lòng chọn slug khác');
    // }

    // check thể loải đã tồn tại chưa
    const categoriesExisting = await Categories.findById(payload.category);
    if (!categoriesExisting) {
        throw new Error('Thể loại không tồn tại');
    }
    const created = await Product.create(payload);
    return created;
}


export const getProductByIdService = async (productId) => {
    const product = await Product.findById(productId).populate('category');
    if (!product) {
        throw new Error("Sản phẩm không tồn tại");
    }
    return product;
}

export const deleteProductByIdService = async (productId) => {

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
        throw new Error("Sản phẩm không tồn tại");
    }
    return product;
}