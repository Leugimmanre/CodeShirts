import mongoose, { Schema } from "mongoose";

// Create the products database schema
const ordersSchema = mongoose.Schema({
    customer: {
        type: Schema.ObjectId,
        ref: 'Customers',
    },
    order: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Products',
        },
        quantity: Number,
    }],
    total: {
        type: Number
    }
});

const Orders = mongoose.model("Orders", ordersSchema);

export default Orders;
