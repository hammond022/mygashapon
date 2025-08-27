import express from "express";
import usersRoutes from "./users.js";

const router = express.Router();

// routes
router.use("/users", usersRoutes);

export default router;
