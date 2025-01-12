"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/api";
import { useMovieContext } from "@/contexts/MovieContext";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(movie.id);
      toast.success("Removed from favorites");
    } else {
      addFavorite(movie);
      toast.success("Added to favorites");
    }
  };

  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="relative h-64">
          <Image
            src={movie.poster || "/placeholder.png"}
            alt={movie.title}
            fill
            className="object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`h-6 w-6 ${favorite ? "fill-red-500" : "text-white"}`}
            />
          </Button>
        </div>
        <div className="p-4">
          <h2 className="text-lg text-black font-semibold mb-2">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-600">{movie.year}</p>
        </div>
      </div>
    </Link>
  );
}
