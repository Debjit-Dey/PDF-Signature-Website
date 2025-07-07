import mongoose from 'mongoose';

const signatureSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  signStatus: {
    type: String,
    enum: ['pending', 'signed', 'rejected'],
    default: 'signed'
  }
}, { timestamps: true });

export default mongoose.model('Signature', signatureSchema);
