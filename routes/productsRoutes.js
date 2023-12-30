import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
// Import CRUD
import {
  uploadMiddleware,
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from "../controllers/ProductsController.js";

router
  .post("/api/add-product", uploadMiddleware, addProduct)
  .get("/api/get-products", getProducts);

  router
  .get("/api/get-product/:id", getProduct)
  .put("/api/update-product/:id", uploadMiddleware, updateProduct)
  .delete("/api/delete-product/:id", deleteProduct)
  .post("/api/find-product/:query", searchProducts);

export default router;
