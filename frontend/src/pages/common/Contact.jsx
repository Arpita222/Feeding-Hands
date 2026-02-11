import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-6 py-16">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Contact <span className="text-green-600">Feeding Hands</span>
        </h1>

        <p className="mt-5 text-gray-600 text-lg max-w-2xl mx-auto">
          Want to collaborate, volunteer, or need support? Feel free to contact
          us anytime. We will respond as soon as possible.
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Info Cards */}
        <div className="flex flex-col gap-6">
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
            <FaEnvelope className="text-green-600 text-2xl mb-3" />
            <h3 className="text-lg font-bold text-gray-900">Email</h3>
            <p className="text-gray-600 mt-1">feedinghands.support@gmail.com</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
            <FaPhoneAlt className="text-green-600 text-2xl mb-3" />
            <h3 className="text-lg font-bold text-gray-900">Phone</h3>
            <p className="text-gray-600 mt-1">+91 95794 03077</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
            <FaMapMarkerAlt className="text-green-600 text-2xl mb-3" />
            <h3 className="text-lg font-bold text-gray-900">Location</h3>
            <p className="text-gray-600 mt-1">Pune, Maharashtra, India</p>
          </div>

          <div className="bg-green-600 text-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold">Let’s Build Impact Together</h3>
            <p className="mt-3 text-green-100 leading-relaxed">
              Feeding Hands connects hotels, NGOs and volunteers to ensure food
              reaches the needy. Your support can help reduce food waste.
            </p>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            Send us a Message
          </h2>
          <p className="text-gray-600 mt-2">
            Fill the form below and we will get back to you.
          </p>

          <form className="flex flex-col gap-5 mt-6">
            <input
              type="text"
              placeholder="Your Name"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <button
              type="submit"
              className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md"
            >
              Send Message
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-4">
            Note: Currently this form is UI only. Backend integration can be
            added later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
