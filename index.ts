import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middlewares/error";
import userRoutes from "./routes/userRoutes";
import jobRoutes from "./routes/jobRoutes";

dotenv.config();

const app = express();

app.use(express.json());

// User Route
app.use("/api/users", userRoutes);

// Job Route
app.use("/api/jobs", jobRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running"));
