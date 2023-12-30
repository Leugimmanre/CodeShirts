import mongoose from "mongoose";

// Create the products database schema
const productsSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        index: true
    },
    price: {
        type: Number,
        trim: true,
    },
    image: {
        type: String,
    }
});
const Products = mongoose.model("Products", productsSchema);

export default Products;