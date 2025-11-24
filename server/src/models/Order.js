import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        customerName: { type: String },
        customerEmail: { type: String },
        upiId: { type: String },
        items: [
            {
                productId: String,
                title: String,
                price: Number,
                image: String,
                qty: { type: Number, default: 1 },
            },
        ],
        total: Number,
        status: { type: String, default: "created" },
        paymentMethod: { type: String, enum: ["upi", "card"], required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);


