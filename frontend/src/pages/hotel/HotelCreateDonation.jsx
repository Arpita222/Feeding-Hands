import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { createDonationApi } from "../../services/donationApi";
import toast from "react-hot-toast";
import {
  FaUtensils,
  FaClock,
  FaMapMarkerAlt,
  FaPlusCircle,
} from "react-icons/fa";

const HotelCreateDonation = () => {
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    expiryTime: "",
    longitude: "",
    latitude: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        foodName: formData.foodName,
        quantity: Number(formData.quantity),
        expiryTime: new Date(formData.expiryTime),
        pickupLocation: {
          type: "Point",
          coordinates: [Number(formData.longitude), Number(formData.latitude)],
        },
      };

      const res = await createDonationApi(payload);

      toast.success(res.message || "Donation created successfully 🎉");

      setFormData({
        foodName: "",
        quantity: "",
        expiryTime: "",
        longitude: "",
        latitude: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Create Donation 🍲
        </h1>
        <p className="text-gray-600">
          Fill donation details and pickup location. NGOs will see it instantly.
        </p>
      </div>

      {/* Card */}
      <div className="mt-10 max-w-3xl bg-white/90 backdrop-blur-xl shadow-lg border border-gray-100 rounded-3xl p-8">
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          {/* Food Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Food Name
            </label>

            <div className="relative mt-2">
              <FaUtensils className="absolute top-4 left-4 text-gray-400" />
              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={changeHandler}
                placeholder="Ex: Rice, Dal, Biryani"
                className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                required
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Quantity (plates)
            </label>

            <div className="relative mt-2">
              <FaPlusCircle className="absolute top-4 left-4 text-gray-400" />
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={changeHandler}
                placeholder="Ex: 50"
                className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                required
              />
            </div>
          </div>

          {/* Expiry */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Expiry Time
            </label>

            <div className="relative mt-2">
              <FaClock className="absolute top-4 left-4 text-gray-400" />
              <input
                type="datetime-local"
                name="expiryTime"
                value={formData.expiryTime}
                onChange={changeHandler}
                className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Pickup Location (Coordinates)
            </label>

            <p className="text-xs text-gray-500 mt-1">
              Enter longitude & latitude for accurate pickup assignment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="relative">
                <FaMapMarkerAlt className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={changeHandler}
                  placeholder="Longitude (Ex: 73.8567)"
                  className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  required
                />
              </div>

              <div className="relative">
                <FaMapMarkerAlt className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={changeHandler}
                  placeholder="Latitude (Ex: 18.5204)"
                  className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-2xl font-semibold hover:bg-green-700 transition shadow-md disabled:bg-gray-400"
          >
            {loading ? "Creating Donation..." : "Create Donation"}
          </button>

          {/* Extra Message */}
          <p className="text-center text-xs text-gray-500">
            Donations will automatically appear in NGO dashboard after creation.
          </p>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default HotelCreateDonation;

