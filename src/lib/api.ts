const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const API_URL = "https://www.omdbapi.com/";

if (!API_KEY) {
  throw new Error("NEXT_PUBLIC_OMDB_API_KEY is not defined");
}

export interface Movie {
  id: string;
  title: string;
  year: string;
  poster: string;
  plot: string;
  cast: string[];
  director: string;
}

export async function searchMovies(
  query: string,
  page: number,
  year?: string
): Promise<Movie[]> {
  const yearParam = year ? `&y=${Number(year)}` : "";
  const url = `${API_URL}?apikey=${API_KEY}&s=${query}&page=${page}${yearParam}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  if (data.Response === "False") {
    return [];
  }

  return data.Search.map((movie: any) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster !== "N/A" ? movie.Poster : "/default-poster.jpg",
  }));
}

export async function searchFirstTime(
  year: string | number,
  page: number = 1
): Promise<Movie[]> {
  const url = `${API_URL}?apikey=${API_KEY}&y=${year}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  if (data.Response === "False") {
    return [];
  }

  return data.Search.map((movie: any) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster !== "N/A" ? movie.Poster : "/default-poster.jpg",
  }));
}

export async function searchMoviesWithFilter(
  query: string,
  page: number,
  filter: { year: string; rating: string }
): Promise<Movie[]> {
  const url = `${API_URL}?apikey=${API_KEY}&s=${query}&y=${filter.year}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  if (data.Response === "False") {
    return [];
  }

  return data.Search.map((movie: any) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster !== "N/A" ? movie.Poster : "/default-poster.jpg",
  }));
}

export async function getMovieDetails(id: string): Promise<Movie | null> {
  const url = `${API_URL}?apikey=${API_KEY}&i=${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await response.json();

  if (data.Response === "False") {
    return null;
  }

  return {
    id: data.imdbID,
    title: data.Title,
    year: data.Year,
    poster: data.Poster !== "N/A" ? data.Poster : "/default-poster.jpg",
    plot: data.Plot,
    cast: data.Actors.split(", "),
    director: data.Director,
  };
}
