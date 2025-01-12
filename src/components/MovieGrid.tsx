"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { searchMovies, Movie, searchMoviesWithFilter } from "@/lib/api";
import { useMovieContext } from "@/contexts/MovieContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MovieGrid() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { cachedMovies, setCachedMovies, filters, setFilters } =
    useMovieContext();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  const loadMoreMovies = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    // console.log("loading more movies");

    try {
      let newMovies: Movie[];
      if (cachedMovies[query] && page === 1 && filters.year === " ") {
        newMovies = cachedMovies[query];
        // console.log("using cached movies");
      } else {
        newMovies = await searchMovies(
          query,
          page,
          year && year !== " " ? year : undefined
        );
        // console.log("fetching new movies");
        if (page === 1 && year === " ") {
          setCachedMovies(query, newMovies);
        }
      }

      // console.log("newMovies", newMovies);

      // Apply filters
      // newMovies = newMovies.filter((movie) => {
      //   if (filters.year && movie.year != filters.year) return false;
      //   // Add more filter conditions as needed
      //   // console.log("working");
      //   return true;
      // });

      // console.log("newMovies", newMovies);

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      setError("Failed to load movies. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [loading, query, page, cachedMovies, setCachedMovies, year]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreMovies();
    }
  }, [inView, hasMore, loadMoreMovies, year]);

  useEffect(() => {
    if (year) {
      loadMoreMovies();
    }
  }, [year]);

  const handleFilterChange = (name: string, value: string) => {
    setYear(value);
    setFilters((prev: Filters) => ({ ...prev, [name]: value }));

    if (name === "year" && value === " ") {
      // console.log("clearing cache");
      setYear(" ");
      setMovies([]);
      setPage(1);
      setHasMore(true);
    }
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <Select onValueChange={(value) => handleFilterChange("year", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All Years</SelectItem>
            {Array.from({ length: 35 }, (_, i) => 2024 - i).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("rating", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value=" ">All Ratings</SelectItem>
            <SelectItem value="G">G</SelectItem>
            <SelectItem value="PG">PG</SelectItem>
            <SelectItem value="PG-13">PG-13</SelectItem>
            <SelectItem value="R">R</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-64 bg-gray-300 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0
          ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          : !loading && (
              <div className="text-center text-gray-700">No movies found.</div>
            )}
      </div>
      {!loading && hasMore && (
        <div ref={ref} className="text-center">
          <Button onClick={loadMoreMovies}>Load More</Button>
        </div>
      )}
    </div>
  );
}
