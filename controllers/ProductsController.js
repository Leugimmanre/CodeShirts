import Products from "../models/ProductsModel.js";
import handleErrors from "../helpers/handleErrors.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// products CRUD
// CREATE new products
const addProduct = async (req, res, next) => {
    // Create a new product
    const newProduct = new Products(req.body);
    try {
        if (req.file.filename) {
            newProduct.image = req.file.filename;
        }
        // Save it in the DB
        const savedproduct = await newProduct.save();
        // Successful response
        res.status(201).json(savedproduct);
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};
// READ all products
const getProducts = async (req, res) => {
    try {
        // Query the DB to get all the products
        const products = await Products.find({});
        // There are no registered products
        if (products.length === 0) {
            return handleErrors(res, 404, 'No registered product found.');
        }
        res.status(200).json(products);
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};
// READ a product by ID
const getProduct = async (req, res) => {
    try {
        // Query the DB to get a the product
        const product = await Products.findById({_id: req.params.id});
        // product no found
        if (!product) {
            return handleErrors(res, 404, 'Product no found.');
        }
        res.status(200).json(product);
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
};
// UPDATE a product by ID
const updateProduct = async (req, res, next) => {
    try {
        // Search the product by its ID
        const oldProduct = await Products.findById(req.params.id);
        // Check if the product was found
        if (!oldProduct) {
            return handleErrors(res, 404, 'Product no found.');
        }
        // Build a new product with the existing data
        const updatedProductData = {
            ...(req.body.name ? { name: req.body.name } : { name: oldProduct.name }),
            ...(req.body.price ? { price: req.body.price } : { price: oldProduct.price }),
            image: req.file ? req.file.filename : oldProduct.image
        };
       // Query the DB to update a product by ID
       const updatedProduct = await Products.findByIdAndUpdate(req.params.id, updatedProductData, { new: true });
       res.status(200).json(updatedProduct);
    } catch (error) {
        handleErrors(res, 500, error.message);
        next();
    }
};
// DELETE a product by ID
const deleteProduct = async (req, res) => {
    try {
        // Search the product by its ID
        const product = await Products.findById(req.params.id);
        // Check if the product was found
        if (!product) {
            return handleErrors(res, 404, 'Product no found.');
        }
        // Query the DB to delete a product by ID
        await Products.findByIdAndDelete(req.params.id);
        // Check if the file exists before trying to delete it
        if (product.image) {
            const imagePath = path.resolve(__dirname, '../uploads/', product.image);
            if (fs.existsSync(imagePath)) {
                // Remove the associated image file here
                fs.unlinkSync(imagePath);
            } else {
                console.log(`The file ${product.image} does not exist in ${imagePath}`);
            }
        }
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
        handleErrors(res, 500, error.message);
    }

};
// Find products by ID
const searchProducts = async (req, res) => {
    try {
        // Get the query
        const {query} = req.params;
        const result = await Products.find({name: new RegExp(query, 'i')});
        res.status(200).json(result);
    } catch (error) {
        handleErrors(res, 500, error.message);
    }
}

export {
    uploadMiddleware,
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    searchProducts

}