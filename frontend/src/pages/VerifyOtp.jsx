import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { AUTH_API } from "../services/apis";
import { motion } from "framer-motion";
import { MdMarkEmailRead } from "react-icons/md";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const otpUser = JSON.parse(localStorage.getItem("otpUser"));

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (!otpUser) {
      toast.error("No registration data found.");
      return navigate("/register");
    }

    try {
      await apiConnector(
        "post",
        AUTH_API.VERIFY_OTP,
        { email: otpUser.email, otp: finalOtp },
        { withCredentials: true }
      );

      localStorage.removeItem("otpUser");
      toast.success("OTP verified! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <motion.div
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-blue-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-6 text-blue-700">
          <MdMarkEmailRead className="text-3xl mr-2" />
          <h1 className="text-2xl font-bold">OTP Verification</h1>
        </div>

        <p className="text-sm text-center text-gray-600 mb-4">
          Enter the 6-digit OTP sent to <strong>{otpUser?.email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Didn't receive the OTP?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            Register again
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
