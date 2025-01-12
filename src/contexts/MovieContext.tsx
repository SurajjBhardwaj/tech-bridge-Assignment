'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Movie } from '@/lib/api'

interface Filters {
  year: string
  rating: string
}

interface MovieContextType {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  cachedMovies: Record<string, Movie[]>
  setCachedMovies: (query: string, movies: Movie[]) => void
  filters: Filters
  setFilters: (filters: Filters) => void
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [cachedMovies, setCachedMovies] = useState<Record<string, Movie[]>>({})
  const [filters, setFilters] = useState<Filters>({ year: '', rating: '' })

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, movie]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((m) => m.id !== id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const isFavorite = (id: string) => favorites.some((m) => m.id === id)

  const setCachedMoviesForQuery = (query: string, movies: Movie[]) => {
    setCachedMovies((prev) => ({ ...prev, [query]: movies }))
  }

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        cachedMovies,
        setCachedMovies: setCachedMoviesForQuery,
        filters,
        setFilters,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export function useMovieContext() {
  const context = useContext(MovieContext)
  if (context === undefined) {
    throw new Error('useMovieContext must be used within a MovieProvider')
  }
  return context
}


