const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const API_URL = "http://www.omdbapi.com/";

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
  page: number
): Promise<Movie[]> {
  const response = await fetch(
    `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`
  );

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
    poster: movie.Poster,
  }));
}

export async function searchFirstTime(
  year: string | number,
  page: number = 1
): Promise<Movie[]> {
  const response = await fetch(
    `${API_URL}?apikey=${API_KEY}&y=${year}&page=${page}`
  );
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
    poster: movie.Poster,
  }));
}

export async function searchMoviesWithFilter(
  query: string,
  page: number,
  filter: { year: string; rating: string }
): Promise<Movie[]> {
  const response = await fetch(
    `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&y=${
      filter.year
    }&page=${page}`
  );

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
    poster: movie.Poster,
  }));
}

export async function getMovieDetails(id: string): Promise<Movie | null> {
  const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${id}`);

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
    poster: data.Poster,
    plot: data.Plot,
    cast: data.Actors.split(", "),
    director: data.Director,
  };
}
