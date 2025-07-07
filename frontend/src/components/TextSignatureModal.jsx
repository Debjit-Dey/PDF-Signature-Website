import { useState } from "react";
import { toPng } from "html-to-image";
import { FaTimes } from "react-icons/fa";

const fonts = [
  { name: "Great Vibes", className: "font-great-vibes" },
  { name: "Dancing Script", className: "font-dancing" },
  { name: "Satisfy", className: "font-satisfy" },
];

const TextSignatureModal = ({ onClose, onSelect }) => {
  const [text, setText] = useState("John Doe");
  const [selectedRef, setSelectedRef] = useState(null);

  const handleSelect = async () => {
    if (!selectedRef) return;
    try {
      const dataUrl = await toPng(selectedRef);
      onSelect(dataUrl);
      onClose();
    } catch (error) {
      console.error("Error generating PNG:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        >
          <FaTimes size={18} />
        </button>

        <h3 className="text-lg font-semibold mb-2">Type Your Signature</h3>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
          placeholder="Enter your name"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {fonts.map((font, idx) => (
            <div
              key={idx}
              className="cursor-pointer hover:scale-105 transition transform bg-gray-50 rounded shadow p-3 flex items-center justify-center"
              onClick={(e) => {
                setSelectedRef(e.currentTarget.querySelector(".text-render"));
              }}
            >
              <div
                className={`text-render ${font.className} text-[28px]`}
                style={{ fontWeight: 500 }}
              >
                {text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSelect}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Use Selected Signature
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextSignatureModal;
