import mongoose from "mongoose";

// Create the customer database schema
const customersSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    lastname: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    company: {
        type: String,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: 50,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    phone: {
        type: String,
        trim: true,
        maxlength: 20,
    }
});

const Customers = mongoose.model("Customers", customersSchema);

export default Customers;