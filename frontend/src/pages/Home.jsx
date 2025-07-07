import { Link } from "react-router-dom";
import { GrDocumentPerformance } from "react-icons/gr";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden px-6 py-12">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600 opacity-30 blur-3xl rounded-full animate-ping"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500 opacity-20 blur-2xl rounded-full animate-pulse"></div>

      {/* Main Content */}
      <motion.div
        className="relative w-full max-w-4xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-lg p-10 text-center z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ rotate: -10, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block text-6xl text-emerald-400 drop-shadow-md"
        >
          <GrDocumentPerformance />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white">
          Sign Your Documents{" "}
          <span className="text-emerald-400">Digitally</span>
        </h1>

        <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          Welcome to <span className="text-white font-semibold">E-Sign</span> —
          your trusted platform to sign, seal, and streamline documents with
          just a few clicks. Anywhere. Anytime. Paper-free.
        </p>

        <div className="mt-10 flex justify-center flex-wrap gap-6">
          <Link
            to="/login"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 text-black font-semibold transition-transform transform hover:scale-105 shadow-xl"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold transition-transform transform hover:scale-105 shadow-xl"
          >
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
