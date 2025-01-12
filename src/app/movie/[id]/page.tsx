"use client"

import { getMovieDetails } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";

export default function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      const movieData = await getMovieDetails(params.id);
      if (!movieData) {
        notFound();
      } else {
        setMovie(movieData);
      }
      setLoading(false);
    }
    fetchMovie();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="w-full flex flex-col md:flex-row gap-8 p-4 bg-gray-100 rounded-lg shadow-lg">
          <div className="w-full md:w-1/3">
            <div className="w-full h-[450px] bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-24 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <div className="text-center text-gray-700">No movie found.</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full  flex flex-col md:flex-row gap-8 p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="w-full md:w-1/3">
          <Image
            src={movie.poster || "/placeholder.png"}
            alt={movie.title}
            width={300}
            height={450}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{movie.title}</h1>
          <p className="text-xl mb-2 text-gray-600">{movie.year}</p>
          <p className="mb-4 text-gray-700">{movie.plot}</p>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Cast</h2>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            {movie.cast.map((actor) => (
              <li key={actor}>{actor}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">Director</h2>
          <p className="text-gray-700">{movie.director}</p>
        </div>
      </div>
    </div>
  );
}