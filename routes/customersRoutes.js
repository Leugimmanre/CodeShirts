import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
// Import CRUD
import {
    addCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
} from '../controllers/customersController.js';

router
    .post("/api/add-customer", addCustomer)
    .get("/api/get-customers", getCustomers);

router
    .get("/api/get-customer/:id", getCustomer)
    .put("/api/update-customer/:id", updateCustomer)
    .delete("/api/delete-customer/:id", deleteCustomer);


export default router;