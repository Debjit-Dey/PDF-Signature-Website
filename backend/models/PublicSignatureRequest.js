import mongoose from "mongoose";

const publicSignatureRequestSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  isSigned: {
    type: Boolean,
    default: false,
  },
  signedAt: {
    type: Date,
  },
}, { timestamps: true });

export default mongoose.model("PublicSignatureRequest", publicSignatureRequestSchema);
