import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { toast } from "react-hot-toast";
import PDFEditor from "../components/PDFEditor";
import { PUBLIC_SIGNATURE_API } from "../services/apis";

const PublicSigner = () => {
  const { token } = useParams();
  const [document, setDocument] = useState(null);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await apiConnector("get", `public-signature/view/${token}`);
        setDocument(res.document);
      } catch (err) {
        console.log(err);
        toast.error("Invalid or expired link");
      }
    };
    fetchDocument();
  }, [token]);

  const handlePublicSignatureConfirm = async () => {
    try {
      await apiConnector("post", PUBLIC_SIGNATURE_API.CONFIRM_SIGNATURE(token));
      toast.success("Signature confirmed");
      setSigned(true);
    } catch (err) {
      console.log(err);
      toast.error("Failed to confirm signature");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        Sign Document
      </h1>

      {signed ? (
        <div className="text-blue-600 text-lg font-semibold bg-blue-100 border border-blue-300 px-6 py-4 rounded-md shadow">
          ✅ Document Signed Successfully!
        </div>
      ) : document ? (
        <PDFEditor
          document={document}
          isPublic
          onComplete={handlePublicSignatureConfirm}
        />
      ) : (
        <p className="text-blue-500 text-md font-medium mt-10">
          Loading document...
        </p>
      )}
    </div>
  );
};

export default PublicSigner;
