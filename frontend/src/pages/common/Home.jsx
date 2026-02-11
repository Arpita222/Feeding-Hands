import { Link } from "react-router-dom";
import {
  FaHandsHelping,
  FaBell,
  FaChartLine,
  FaHotel,
  FaUsers,
  FaHandHoldingHeart,
  FaArrowRight,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-40 -z-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-30 -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text */}
          <div className="flex-1 text-center lg:text-left">
            <p className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              🌱 Smart Food Donation Platform
            </p>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Reduce Food Waste <br />
              <span className="text-green-600">Feed More People</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              Feeding Hands connects hotels, restaurants, NGOs, volunteers, and
              donors to ensure surplus food reaches the needy with real-time
              tracking and alerts.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2"
              >
                Get Started <FaArrowRight />
              </Link>

              <Link
                to="/login"
                className="px-8 py-3 border border-green-600 text-green-700 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition shadow-md flex items-center justify-center gap-2"
              >
                Login
              </Link>
            </div>

            {/* Trust */}
            <p className="mt-6 text-sm text-gray-500">
              Trusted by NGOs & volunteers across multiple cities.
            </p>
          </div>

          {/* Right Card UI */}
          <div className="flex-1 w-full">
            <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">
                🚀 How Feeding Hands Works
              </h3>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-100 text-green-600 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Hotel creates donation
                    </h4>
                    <p className="text-sm text-gray-600">
                      Hotels add food details, quantity, expiry time & location.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-100 text-green-600 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      NGO accepts donation
                    </h4>
                    <p className="text-sm text-gray-600">
                      NGOs reserve food instantly from available list.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-100 text-green-600 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Volunteer delivers food
                    </h4>
                    <p className="text-sm text-gray-600">
                      Admin assigns volunteer → pickup → delivery completed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-100 text-green-600 font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Impact tracked in dashboard
                    </h4>
                    <p className="text-sm text-gray-600">
                      Analytics show meals donated & deliveries completed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/register"
                  className="text-green-700 font-semibold hover:underline"
                >
                  Start your first donation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white shadow-lg rounded-3xl p-8 border border-gray-100">
          <div className="text-center">
            <h3 className="text-4xl font-extrabold text-green-600">500+</h3>
            <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
              <FaHandsHelping className="text-green-600" /> Meals Donated
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-extrabold text-green-600">120+</h3>
            <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
              <FaUsers className="text-green-600" /> Active Volunteers
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-extrabold text-green-600">80+</h3>
            <p className="text-gray-600 mt-2 flex items-center justify-center gap-2">
              <FaHandHoldingHeart className="text-green-600" /> NGOs Connected
            </p>
          </div>
        </div>
      </section>

      {/* ROLES SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">
          Built for Everyone
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
          Feeding Hands provides role-based dashboards for smooth donation
          handling and distribution workflow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {/* Hotel */}
          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition">
            <FaHotel className="text-green-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Hotels</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Create food donation requests and track donation history easily.
            </p>
          </div>

          {/* NGO */}
          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition">
            <FaHandsHelping className="text-green-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold text-gray-900">NGOs</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Reserve available donations, request pickups, and manage deliveries.
            </p>
          </div>

          {/* Volunteer */}
          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition">
            <FaUsers className="text-green-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Volunteers</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Pick assigned donations and complete deliveries in real-time.
            </p>
          </div>

          {/* Donor */}
          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition">
            <FaHandHoldingHeart className="text-green-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Donors</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Donate money and receive coupons while tracking personal impact.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">
          Why Feeding Hands?
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
          Powerful features designed to make donation and distribution smooth and
          transparent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition">
            <FaHandsHelping className="text-green-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Multi Role System</h3>
            <p className="text-gray-600 text-sm">
              Secure dashboards for Admin, Hotel, NGO, Volunteer and Donor roles.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition">
            <FaBell className="text-green-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Real Time Alerts</h3>
            <p className="text-gray-600 text-sm">
              Instant socket-based notifications for updates & expiring food
              alerts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 hover:shadow-xl transition">
            <FaChartLine className="text-green-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Impact Analytics</h3>
            <p className="text-gray-600 text-sm">
              Track meals donated, deliveries completed and overall platform
              impact.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL / TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28">
        <div className="bg-green-600 rounded-3xl p-10 md:p-14 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Together We Can Make a Difference
          </h2>

          <p className="mt-4 text-green-100 max-w-2xl mx-auto">
            Every donation matters. Feeding Hands helps reduce waste and ensures
            food reaches those who truly need it.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-green-700 rounded-xl font-bold hover:bg-gray-100 transition shadow-md"
            >
              Register Now
            </Link>

            <Link
              to="/about"
              className="px-8 py-3 border border-white text-white rounded-xl font-bold hover:bg-white hover:text-green-700 transition shadow-md"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* FOOT CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-24 pb-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Ready to contribute?
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Join Feeding Hands today and be part of the mission to reduce food
          waste and feed the needy.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 px-10 py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition shadow-lg"
        >
          Get Started Today
        </Link>
      </section>
    </div>
  );
};

export default Home;
