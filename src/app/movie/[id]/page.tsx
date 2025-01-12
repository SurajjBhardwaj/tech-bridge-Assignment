import { getMovieDetails } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
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
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <p className="text-xl mb-2">{movie.year}</p>
        <p className="mb-4">{movie.plot}</p>
        <h2 className="text-2xl font-semibold mb-2">Cast</h2>
        <ul className="list-disc list-inside mb-4">
          {movie.cast.map((actor) => (
            <li key={actor}>{actor}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Director</h2>
        <p>{movie.director}</p>
      </div>
    </div>
  );
}
