import express from "express";
import { sendPublicSignatureLink, getDocumentByToken, confirmPublicSignature  } from "../controllers/publicSignatureController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Protected route for authenticated users to send public signature link
router.post("/request", auth, sendPublicSignatureLink);

router.get("/view/:token", getDocumentByToken);
router.post("/confirm/:token", confirmPublicSignature);

export default router;
