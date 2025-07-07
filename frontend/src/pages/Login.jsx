import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/auth/authSlice";
import { apiConnector } from "../services/apiConnector";
import { AUTH_API } from "../services/apis";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiConnector("post", AUTH_API.LOGIN, form, {
        withCredentials: true,
      });

      dispatch(setUser({ ...res.user, token: res.token }));
      localStorage.setItem("token", res.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.message || "Login failed";
      toast.error(msg);
      if (msg.toLowerCase().includes("invalid")) {
        toast("New here? Register instead.", { icon: "🔑" });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100 px-4">
      <motion.div
        className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-blue-200"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Document Signature
          </h1>
          <p className="text-sm text-gray-500 mt-1">Secure | Simple | Smart</p>
        </div>

        <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 pr-10 rounded-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium shadow-md transition-all duration-200"
            whileTap={{ scale: 0.97 }}
          >
            Login
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
