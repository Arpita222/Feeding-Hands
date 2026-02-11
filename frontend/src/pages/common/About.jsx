import { Link } from "react-router-dom";
import { FaHandsHelping, FaLeaf, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-6 py-16">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          About <span className="text-green-600">Feeding Hands</span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Feeding Hands is a surplus food donation platform built to reduce food
          waste and help communities. We connect hotels, restaurants, NGOs,
          donors and volunteers so that extra food reaches people in need.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="bg-white shadow-md rounded-2xl p-8 border border-green-100">
          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            To create a reliable and scalable system that ensures surplus food
            is never wasted and reaches the right hands at the right time.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            We aim to build transparency and trust using real-time tracking,
            role-based dashboards, notifications and analytics.
          </p>

          <Link
            to="/register"
            className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
          >
            Join the Mission
          </Link>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
            <FaHandsHelping className="text-green-600 text-3xl mb-4" />
            <h3 className="text-lg font-bold text-gray-900">
              Smart Donation Flow
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Hotels can create donations and NGOs can accept instantly with
              transparent tracking.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
            <FaUsers className="text-green-600 text-3xl mb-4" />
            <h3 className="text-lg font-bold text-gray-900">
              Volunteer Network
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Volunteers handle pickups and deliveries, ensuring food reaches
              the right place.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
            <FaLeaf className="text-green-600 text-3xl mb-4" />
            <h3 className="text-lg font-bold text-gray-900">
              Reduce Food Waste
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Every donation reduces waste and helps create a cleaner and more
              sustainable future.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-gray-900">
              Real-Time Alerts
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Socket notifications keep users updated about donation status and
              expiry alerts.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-5xl mx-auto mt-20 bg-green-600 rounded-2xl shadow-lg px-8 py-12 text-center text-white">
        <h2 className="text-3xl font-bold">Together We Can Make Impact</h2>

        <p className="mt-3 text-green-100 max-w-2xl mx-auto">
          Join Feeding Hands today and become part of a community that fights
          hunger and reduces food waste.
        </p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="px-7 py-3 bg-white text-green-700 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            Register Now
          </Link>

          <Link
            to="/contact"
            className="px-7 py-3 border border-white text-white rounded-xl font-bold hover:bg-white hover:text-green-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

