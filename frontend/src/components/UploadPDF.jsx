import { useState } from "react";
import { DOCUMENT_API } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";

const UploadPDF = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a PDF file");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      setUploading(true);
      await apiConnector("post", DOCUMENT_API.UPLOAD, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("PDF uploaded successfully");
      setFile(null);
      onUploadSuccess(); // Refresh document list
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-6 bg-white p-4 rounded shadow flex flex-col items-center justify-center gap-6 w-full h-80">
      {/* Custom File Input Wrapper */}
      <label className="w-3/4 h-3/4 border border-gray-300 rounded flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 text-center text-gray-700">
        <span>{file ? file.name : "Choose a PDF file"}</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`flex items-center gap-2 px-4 py-2 rounded text-white transition ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        <FaUpload />
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
    </div>
  );
};

export default UploadPDF;
