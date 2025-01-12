import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import FavoritesModal from "@/components/FavoritesModal";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Movie Search</h1>
        <FavoritesModal />
      </div>
      <SearchBar />
      <MovieGrid />
    </div>
  );
}
