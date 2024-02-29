const SkeletonLoader = ({ height, width, mb }) => (
  <div
    className={`animate-pulse bg-gray-300 rounded-md h-${height} w-${width} mb-${mb}`}
  />
);

const SkeletonLoading = () => (
  <div className="mx-auto max-w-screen-xl p-8 bg-gray-100 rounded-md shadow-lg">
    <div className="flex items-center mb-4">
      <SkeletonLoader height="4" width="16" />
    </div>

    <h1 className="text-3xl font-bold mb-2">
      <SkeletonLoader height="8" width="64" />
    </h1>

    <div className="flex items-center mb-2">
      <SkeletonLoader height="4" width="20" />
    </div>

    <div className="flex items-center mb-4">
      <SkeletonLoader height="4" width="20" />
    </div>

    <div className="mt-4 text-center">
      <SkeletonLoader height="80" width="full" />
    </div>

    {[...Array(3)].map((_, index) => (
      <div key={index} className="mb-6">
        <SkeletonLoader height="48" width="full" />
      </div>
    ))}
  </div>
);

export default SkeletonLoading;
