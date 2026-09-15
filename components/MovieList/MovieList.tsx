import MovieCard from '../MovieCard'

import type { Props } from './MovieList.types'

const MovieList = ({
 movieData,
 searchFilter,
}: Props) => {
  return (
    <div>
      {searchFilter && <p className='mb-4 text-md lg:text-lg'>Seach Filter: {searchFilter}</p>}
      <div className='grid grid-cols-2 mmd:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {movieData.map((data, idx) => (
          <MovieCard
            hrefLink={`movie/${data.id}`}
            releaseDate={data.release_date ?? ''}
            posterImage={data.poster_path ?? ''}
            title={data.title ?? ''}
            key={`${data.id}-${idx}`}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList