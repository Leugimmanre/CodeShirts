import mongoose from "mongoose";

// Create the products database schema
const usersSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 8,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        maxlength: 50,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    }
});

const Users = mongoose.model("Users", usersSchema);

export default Users;
