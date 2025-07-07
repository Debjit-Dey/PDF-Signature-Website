import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import signatureRoutes from "./routes/signatureRoutes.js";
import savedSignatureRoutes from "./routes/savedSignatureRoutes.js";
import publicSignatureRoutes from "./routes/publicSignatureRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// These two lines help when using ES Modules (__dirname equivalent)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve the 'uploads' folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);
// app.use("/uploads", express.static("uploads"));
app.use("/api/signatures", signatureRoutes);
app.use("/api/saved-signature", savedSignatureRoutes);
app.use("/api/public-signature", publicSignatureRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/public-signature", publicSignatureRoutes);

// Basic Route

app.get("/", (req, res) => {
  res.send("Document Signature App Backend");
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
