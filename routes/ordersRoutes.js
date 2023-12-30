import express from "express";

const router = express.Router();
// Import CRUD
import {
  addOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/ordersController.js";

router
  .post("/api/add-order/:id", addOrder)
  .get("/api/get-orders", getOrders);

router
  .get("/api/get-order/:id", getOrder)
  .put("/api/update-order/:id", updateOrder)
  .delete("/api/delete-order/:id", deleteOrder);

export default router;
