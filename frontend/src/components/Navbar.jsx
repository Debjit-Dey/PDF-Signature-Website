import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../utils/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateTimeAndGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(formattedTime);

      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 17) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateTimeAndGreeting(); // initial
    const interval = setInterval(updateTimeAndGreeting, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center rounded-md mb-4">
      <h1
        className="text-xl font-bold text-indigo-700 cursor-pointer flex items-center gap-2"
        onClick={() => navigate("/dashboard")}
      >
        📄 Signature App
      </h1>

      <div className="flex items-center gap-6">
        {/* Greeting and Time (Visible on lg screens) */}
        <div className="hidden lg:flex flex-col items-end text-right">
          <p className="text-blue-900 font-semibold">
            {greeting}, {user?.name || "User"} 👋
          </p>
          <p className="text-sm text-gray-500">{currentTime}</p>
        </div>

        {/* Profile + Logout */}
        <div className="flex items-center gap-3 text-gray-700 font-medium">
          <FaUser className="text-blue-600" />
          <span className="hidden sm:inline">{user?.name || "User"}</span>
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition duration-200"
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Logout
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded text-gray-700 border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
