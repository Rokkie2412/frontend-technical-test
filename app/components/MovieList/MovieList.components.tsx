import MovieCard from '../MovieCard'

import type { Props } from './MovieList.types'

const MovieList = ({
 movieData
}: Props) => {
  return (
    <div className='grid grid-cols-7 gap-4'>
      {movieData.map((data, idx) => (
        <MovieCard
          releaseDate={data.release_date ?? ''}
          posterImage={data.poster_path ?? ''}
          title={data.title ?? ''}
          key={`${data.id}-${idx}`}
        />
      ))}
    </div>
  )
}

export default MovieList