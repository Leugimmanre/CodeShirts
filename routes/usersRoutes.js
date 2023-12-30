import express from "express";

const router = express.Router();
// Import CRUD
import {
  createAccount,
  authenticateUser,
} from "../controllers/usersController.js";

router
  .post("/api/authenticate", authenticateUser)
  .post("/api/create-account", createAccount);

export default router;

