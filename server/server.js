import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import apiRoutes from "./routes/api/index.js";

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
