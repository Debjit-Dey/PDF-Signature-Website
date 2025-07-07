import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { AUTH_API } from "../services/apis";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      const { name, email, password } = form;

      await apiConnector(
        "post",
        AUTH_API.REGISTER,
        { name, email, password },
        {
          withCredentials: true,
        }
      );

      toast.success("OTP sent to your email");
      localStorage.setItem(
        "otpUser",
        JSON.stringify({ name, email, password })
      );
      navigate("/verify-otp");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100 px-4">
      <motion.div
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-blue-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Document Signature
          </h1>
          <p className="text-sm text-gray-500 mt-1">Sign. Secure. Share.</p>
        </div>

        <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm text-gray-700 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-gray-700 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="text-sm text-gray-700 block mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter a password"
              className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <span
              className="absolute top-[38px] right-3 text-gray-600 cursor-pointer hover:text-blue-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="text-sm text-gray-700 block mb-1"
            >
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />
            <span
              className="absolute top-[38px] right-3 text-gray-600 cursor-pointer hover:text-blue-600"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <motion.button
            type="submit"
            className={`w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium py-2 rounded-md transition-all duration-200 shadow`}
            whileTap={{ scale: 0.96 }}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
