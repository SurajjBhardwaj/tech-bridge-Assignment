# Movie Search Application

This is a movie search application built with Next.js. It allows users to search for movies, filter results by year and rating, and view detailed information about each movie.

## Setup

### Prerequisites

- Node.js (>= 18.x)
- npm or yarn
- typescript 

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SurajjBhardwaj/tech-bridge-Assignment.git
   cd tech-bridge-Assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OMDB API key:

   ```env
   NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
   ```
   check what variable to add in .env.example

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

### Searching for Movies

The application uses the OMDB API to search for movies based on the user's query. The search results are displayed in a grid format, with each movie represented by a card.

### Filtering

Users can filter the search results by year and rating (rating is not woring right now, since OMDB APi was haivng no any option to pass rating as query parameter). The filters are implemented using the `Select` component from the `@/components/ui/select` module. When a filter is applied, the `handleFilterChange` function updates the state and triggers a new search with the selected filters.

### Optimization

The application uses the `useInView` hook from the `react-intersection-observer` library to implement infinite scrolling. When the user scrolls to the bottom of the page, the `loadMoreMovies` function is called to fetch more movies.

### Caching

The application caches search results to reduce the number of API calls and improve performance. The `useMovieContext` hook provides access to the cached movies. When a search query is repeated, the application first checks the cache before making a new API call.

## Project Structure

- `src/components`: Contains the React components used in the application.
- `src/contexts`: Contains the context providers for managing global state.
- `src/lib`: Contains utility functions and API calls.
- `src/pages`: Contains the Next.js pages.

## API

The application uses the following API functions from the `@/lib/api` module:

- `searchMovies(query: string, page: number, year?: string): Promise<Movie[]>`: Searches for movies based on the query, page number, and optional year filter.
- `searchMoviesWithFilter(query: string, page: number, filter: { year: string; rating: string }): Promise<Movie[]>`: Searches for movies based on the query, page number, and filter object.
- `getMovieDetails(id: string): Promise<Movie | null>`: Fetches detailed information about a movie by its ID.


## Thanks ❤️