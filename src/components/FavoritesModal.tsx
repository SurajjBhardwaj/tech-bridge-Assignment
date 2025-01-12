"use client";

import { useState } from "react";
import { useMovieContext } from "@/contexts/MovieContext";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/MovieCard";

export default function FavoritesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites, removeFavorite } = useMovieContext();

  return (
    <DialogRoot open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-4 py-2">
          Favorites
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg p-6 bg-black rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white-800">
            Your Favorite Movies
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto grid gap-6 md:grid-cols-1">
          {favorites.length === 0 ? (
            <p className="text-gray-600 text-center">
              You haven&apos;t added any favorites yet.
            </p>
          ) : (
            favorites.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-transform"
              >
                <MovieCard movie={movie} className="flex-grow" />
                <Button
                  variant="destructive"
                  onClick={() => removeFavorite(movie.id)}
                  className="mt-4 md:mt-0 md:ml-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Remove
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </DialogRoot>
  );
}
