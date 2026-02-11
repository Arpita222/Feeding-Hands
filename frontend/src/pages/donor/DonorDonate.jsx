import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { donateMoneyApi } from "../../services/donorApi";
import toast from "react-hot-toast";

import { FaHandHoldingHeart, FaRupeeSign, FaCreditCard } from "react-icons/fa";

const DonorDonate = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const donateHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        amount: Number(amount),
        paymentMethod,
      };

      const res = await donateMoneyApi(payload);

      toast.success(res.message || "Donation successful 🎉");

      setAmount("");
      setPaymentMethod("UPI");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Donation failed");
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [100, 200, 500, 1000];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaHandHoldingHeart className="text-green-600" /> Donate Money
          </h1>

          <p className="text-gray-600 mt-2 max-w-2xl">
            Support the Feeding Hands mission by contributing financially.
            Your donation helps provide meals to people in need.
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donation Form */}
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Make a Contribution 💚
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Choose an amount and payment method.
          </p>

          {/* Quick Buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            {quickAmounts.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className="px-5 py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-green-50 hover:border-green-300 transition"
              >
                ₹ {val}
              </button>
            ))}
          </div>

          <form onSubmit={donateHandler} className="flex flex-col gap-5 mt-8">
            {/* Amount */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Amount (₹)
              </label>

              <div className="relative">
                <FaRupeeSign className="absolute top-4 left-4 text-gray-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Payment Method
              </label>

              <div className="relative">
                <FaCreditCard className="absolute top-4 left-4 text-gray-400" />
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-gray-200 p-3 pl-12 rounded-xl outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition bg-white"
                >
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                  <option value="NETBANKING">Net Banking</option>
                  <option value="CASH">Cash</option>
                </select>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Donate Now"}
            </button>
          </form>
        </div>

        {/* Side Info Card */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Why Your Donation Matters 🌍
          </h2>

          <p className="text-gray-700 mt-4 leading-relaxed">
            Your money donation helps NGOs deliver food faster, supports
            volunteers, and ensures surplus food reaches the needy safely.
          </p>

          <div className="mt-6 space-y-4">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-600 font-medium">₹100 can help</p>
              <h3 className="text-lg font-bold text-green-600 mt-1">
                Provide 2+ meals
              </h3>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-600 font-medium">₹500 can help</p>
              <h3 className="text-lg font-bold text-green-600 mt-1">
                Sponsor a small family meal pack
              </h3>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-600 font-medium">
                Your donations are tracked
              </p>
              <h3 className="text-lg font-bold text-gray-900 mt-1">
                Earn coupons & impact points
              </h3>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-8">
            ⚡ Payments are processed securely. Feeding Hands uses role-based JWT
            authentication.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DonorDonate;

