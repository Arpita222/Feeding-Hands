const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10">
      <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
};

export default Loader;
