import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo Section */}
        <div>
          <h2 className="text-2xl font-bold text-green-600">Feeding Hands</h2>
          <p className="text-gray-600 mt-3 leading-relaxed">
            A food donation platform connecting Hotels, NGOs and Volunteers
            to reduce food waste and feed more people.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
          <div className="flex flex-col gap-3 mt-4 text-gray-600 font-medium">
            <Link to="/" className="hover:text-green-600 transition">
              Home
            </Link>

            <Link to="/about" className="hover:text-green-600 transition">
              About
            </Link>

            <Link to="/contact" className="hover:text-green-600 transition">
              Contact
            </Link>

            <Link to="/login" className="hover:text-green-600 transition">
              Login
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
          <p className="text-gray-600 mt-4">
            Pune, Maharashtra, India
          </p>
          <p className="text-gray-600 mt-2">
            Email: <span className="font-medium">feedinghands@gmail.com</span>
          </p>
          <p className="text-gray-600 mt-2">
            Phone: <span className="font-medium">+91 90000 00000</span>
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-100 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Feeding Hands. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

