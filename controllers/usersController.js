import handleErrors from "../helpers/handleErrors.js";
import jwt from "jsonwebtoken";
import Users from "../models/UsersModel.js";
import bcrypt from "bcrypt";

// Authenticate Account
const authenticateUser = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        // Find user
        const userExists = await Users.findOne({email});
        if (!userExists) {
            // If user does not exist
            handleErrors(res, 401, 'User not found.');
            next();
        } else {
            // User exists, but incorrect password
            if (!bcrypt.compareSync(password, userExists.password)) {
                handleErrors(res, 401, 'Unauthorized user.');
                next();
            } else {
                // User exists and password is incorrect, sign the token.
                const token = jwt.sign({
                    name: userExists.name,
                    email: userExists.email,
                    id: userExists._id
                  },
                    'wordsupersecret@',
                    {
                      expiresIn: '1d'
                    });
                res.json({token});
            }
        }
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};

// Create Account
const createAccount = async (req, res) => {
    // Read user data
    const newUser = new Users(req.body);
    newUser.password = await bcrypt.hash(req.body.password, 12);
    try {
        // Prevent duplicate user by consulting the DB
        const userExists = await Users.findOne({email: req.body.email});
        if (userExists) {
            return handleErrors(res, 400, 'There is already a registered user with the same email.');
        }
        // Save it in the DB
        const savedUser = await newUser.save();
        // Successful response
        res.status(201).json(savedUser);
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};

export {
    createAccount,
    authenticateUser
}
