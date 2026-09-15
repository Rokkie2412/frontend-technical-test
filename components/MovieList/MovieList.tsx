import type { ReactElement } from 'react'

import MovieCard from '../MovieCard'

import type { FilterInfoProps, Props } from './MovieList.types'
import { onClearFilter } from './MovieList.utils'

const FilterInfo = ({
  filter,
  router,
  filterText
}: FilterInfoProps): ReactElement | null => {
  if (filter) {
    return (
      <div className='flex w-full justify-between'>
        <p className='mb-4 text-md lg:text-lg'>{filterText} {filter}</p>
        <button onClick={onClearFilter(router)} className='border-b mb-4 cursor-pointer'>
          <p className='text-md lg:text-lg'>Clear Filter X</p>  
        </button>
      </div>
    )
  }

  return null
}

const MovieList = ({
 movieData,
 filter,
 filterText,
 router
}: Props) => {
  return (
    <div>
      <FilterInfo router={router} filter={filter} filterText={filterText}/>
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