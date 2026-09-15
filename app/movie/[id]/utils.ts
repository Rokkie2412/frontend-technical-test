import type { 
  CastMovieType, 
  CrewMovieType, 
  MovieDataType, 
  Setter 
} from "@/types"

export const getLinkDetailMovie = (movieId: string): string => {
  const link= `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&language=en-US`

  return link
}

export const getDirector = (data: MovieDataType): CrewMovieType => {
  const findDirector = (data?.credits?.crew.find((item) => item.job === 'Director') as CrewMovieType)

  return findDirector
}

export const getMainCast = (data: MovieDataType, limit: number): CastMovieType[] | undefined => {
  const findMainCast = (data?.credits?.cast.filter((item) => item.order < limit))

  return findMainCast
}

export const addLimitCasting = (setLimitMainCast: Setter<number>) => (): void => {
  setLimitMainCast((prev) => prev + 4)
}
