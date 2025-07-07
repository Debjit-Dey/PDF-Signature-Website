import crypto from "crypto";
import nodemailer from "nodemailer";
import PublicSignatureRequest from "../models/PublicSignatureRequest.js";
import Document from "../models/Document.js";
import AuditLog from "../models/AuditLog.js";

export const sendPublicSignatureLink = async (req, res) => {
  try {
    const { documentId, email } = req.body;

    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ message: "Document not found" });

    const token = crypto.randomBytes(20).toString("hex");

    await PublicSignatureRequest.create({
      documentId,
      email,
      token,
    });

    const publicLink = `${process.env.CLIENT_URL}/sign/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Doc Signature App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Document Signature Request",
      html: `
        <p>You have been requested to sign a document.</p>
        <p>Click the link below to view and sign:</p>
        <a href="${publicLink}">${publicLink}</a>
        <p>This link is secure and unique.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Signature request sent successfully", token });
  } catch (err) {
    console.error("❌ Email send failed:", err);
    res.status(500).json({ message: "Failed to send email", error: err.message });
  }
};
export const getDocumentByToken = async (req, res) => {
  try {
    const { token } = req.params;

    const request = await PublicSignatureRequest.findOne({ token });
    if (!request) {
      return res.status(404).json({ message: "Link expired or invalid" });
    }

    const document = await Document.findById(request.documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json({ document });
  } catch (err) {
    console.error("🔐 Token fetch error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PublicSignatureController.js

export const confirmPublicSignature = async (req, res) => {
  try {
    const { token } = req.params;

    const request = await PublicSignatureRequest.findOne({ token });
    if (!request) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    await AuditLog.create({
      documentId: request.documentId,
      signerEmail: request.email,
      ip,
    });

    res.status(200).json({ message: "Audit log saved" });
  } catch (err) {
    console.error("🛑 Signature confirm failed:", err);
    res.status(500).json({ message: "Failed to confirm signature", error: err.message });
  }
};
