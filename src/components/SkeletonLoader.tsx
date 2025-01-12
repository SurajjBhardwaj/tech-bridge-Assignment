export default function SkeletonLoader() {
  return (
    <div className="space-y-8">
      <div className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-64 bg-gray-300 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}
