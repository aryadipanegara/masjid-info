const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-red-500 w-16 h-16 mb-4 mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-bold mb-2">Website Sedang Maintenance</h1>
        <p className="text-gray-600">
          Kami mohon maaf atas ketidaknyamanan ini. Kami sedang melakukan
          pemeliharaan untuk meningkatkan pengalaman Anda.
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
