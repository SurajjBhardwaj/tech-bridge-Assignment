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
        <Button variant="outline">Favorites</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Your Favorite Movies</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {favorites.length === 0 ? (
            <p>You haven&apos;t added any favorites yet.</p>
          ) : (
            favorites.map((movie) => (
              <div key={movie.id} className="flex items-center justify-between">
                <MovieCard movie={movie} />
                <Button
                  variant="destructive"
                  onClick={() => removeFavorite(movie.id)}
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
