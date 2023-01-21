import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { notFound, errorHandler } from "./middlewares/error";

dotenv.config();

const app = express();

app.use(express.json());

// User Route
app.use("/api/user", userRoutes);

// Error Middleware
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running"));
