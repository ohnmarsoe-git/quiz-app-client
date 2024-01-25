const NotFound = () => {
  return (
    <div className="max-w-screen-xl mx-auto mt-28 p-10">
      <div className="flex flex-col items-center">
        <h1 className="text-[120px] font-extrabold text-gray-700">404</h1>
        <p className="text-2xl font-medium text-gray-600 mb-6">
          Page Not Found
        </p>
        <a
          href="/"
          className="px-4 py-2 font-medium text-white bg-blue-600 border-blue-400 rounded-md hover:bg-blue-400 transition-all duration-200 ease-in-out"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
