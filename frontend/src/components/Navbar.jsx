import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600 tracking-wide"
        >
          Feeding Hands
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-medium text-gray-700">
          <Link
            to="/"
            className="hover:text-green-600 transition relative group"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/about"
            className="hover:text-green-600 transition relative group"
          >
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link
            to="/contact"
            className="hover:text-green-600 transition relative group"
          >
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-sm"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-xl border border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition shadow-sm"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 font-medium text-gray-700">
          <Link
            to="/"
            className="hover:text-green-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-green-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          <Link
            to="/contact"
            className="hover:text-green-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          <div className="flex gap-3 pt-2">
            <Link
              to="/login"
              className="w-full text-center px-5 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="w-full text-center px-5 py-2 rounded-xl border border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
