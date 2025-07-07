import Signature from '../models/Signature.js';

export const saveSignature = async (req, res) => {
  try {
    const { documentId, x, y, page, signStatus } = req.body;
    const userId = req.user;

    const newSignature = await Signature.create({
      documentId,
      userId,
      x,
      y,
      page,
      signStatus: signStatus || 'pending'
    });

    res.status(201).json({ message: "Signature saved", signature: newSignature });
  } catch (error) {
    res.status(500).json({ message: "Failed to save signature", error: error.message });
  }
};

export const getSignaturesForDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const signatures = await Signature.find({ documentId: id });

    res.status(200).json({ signatures });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch signatures", error: error.message });
  }
};
