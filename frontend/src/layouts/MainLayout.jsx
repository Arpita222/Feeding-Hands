import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <Navbar />

      {/* Main Page Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;

