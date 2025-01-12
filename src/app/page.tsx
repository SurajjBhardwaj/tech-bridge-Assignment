import { Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import SkeletonLoader from "@/components/SkeletonLoader"; // Import the skeleton loader

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Enter to search movies</h1>
      </div>
      <Suspense fallback={<SkeletonLoader />}>
        <SearchBar />
        <MovieGrid />
      </Suspense>
    </div>
  );
}
