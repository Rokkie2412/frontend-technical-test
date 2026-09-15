import type { MovieDataType } from '../../types/movies.types'

export type Props = {
  movieData: MovieDataType[],
  searchFilter?: string
}
