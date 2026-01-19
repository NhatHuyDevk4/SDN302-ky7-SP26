import mongoose from "mongoose";



const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    item: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
        default: "pending",
    }
}, {
    timestamps: true, // tự động tạo createdAt và updatedAt
})

export default mongoose.model("Order", orderSchema, "orders");
