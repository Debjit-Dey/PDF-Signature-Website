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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Glowing blobs */}
      <div className="absolute w-[400px] h-[400px] bg-blue-400 opacity-20 blur-3xl rounded-full -top-32 -left-32 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-emerald-400 opacity-20 blur-3xl rounded-full -bottom-32 -right-32 animate-pulse" />

      <motion.div
        className="relative z-10 w-full max-w-md bg-white/60 backdrop-blur-md border border-white/30 shadow-2xl rounded-2xl px-8 py-10 space-y-6"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-600">
            Create an Account
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Sign smarter. Stay safer. Share instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              className="w-full mt-1 px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-sm text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter a password"
              className="w-full mt-1 px-4 py-2 pr-10 rounded-md bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <label htmlFor="confirmPassword" className="text-sm text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full mt-1 px-4 py-2 pr-10 rounded-md bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
            } text-white font-semibold py-2 rounded-md shadow transition duration-200`}
            whileTap={{ scale: 0.96 }}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-600">
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
