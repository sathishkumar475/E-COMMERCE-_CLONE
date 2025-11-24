import { Router } from "express";
import Order from "../models/Order.js";

const router = Router();

// Create new order
router.post("/", async (req, res) => {
    try {
        const { userId, items, total, paymentMethod, customerName, customerEmail, upiId } = req.body;
        const order = await Order.create({
            userId,
            items,
            total,
            paymentMethod,
            customerName,
            customerEmail,
            upiId,
            status: "created"
        });
        res.json(order);
    } catch (e) {
        console.error("Order creation error:", e);
        res.status(500).json({ message: "Failed to create order", error: e.message });
    }
});

// Get all orders (for admin/customer view) - must come before /:id route
router.get("/", async (req, res) => {
    try {
        const { userId, status } = req.query;
        const query = {};
        if (userId) query.userId = userId;
        if (status) query.status = status;

        const orders = await Order.find(query).sort({ createdAt: -1 });
        res.json(orders);
    } catch (e) {
        console.error("Get orders error:", e);
        res.status(500).json({ message: "Failed to fetch orders", error: e.message });
    }
});

// Get order by ID with full details
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (e) {
        console.error("Get order error:", e);
        res.status(500).json({ message: "Failed to fetch order", error: e.message });
    }
});

// Update order payment status
router.post("/:id/pay", async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndUpdate(
            id,
            { status: "paid", paidAt: new Date() },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json(order);
    } catch (e) {
        console.error("Payment update error:", e);
        res.status(500).json({ message: "Payment update failed", error: e.message });
    }
});

// Get order summary with customer product details
router.get("/:id/summary", async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const summary = {
            orderId: order._id,
            orderDate: order.createdAt,
            customer: {
                name: order.customerName,
                email: order.customerEmail,
                upiId: order.upiId
            },
            items: order.items,
            total: order.total,
            status: order.status,
            paymentMethod: order.paymentMethod,
            itemCount: order.items.length
        };

        res.json(summary);
    } catch (e) {
        console.error("Get order summary error:", e);
        res.status(500).json({ message: "Failed to fetch order summary", error: e.message });
    }
});

export default router;


