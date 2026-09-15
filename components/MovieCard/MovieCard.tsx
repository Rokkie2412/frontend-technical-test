import type { ReactElement } from 'react'
import Image from 'next/image'

import type { Props } from './MovieCard.types'
import Link from 'next/link'

const MovieCard = ({
  posterImage,
  title,
  releaseDate,
  hrefLink = '',
  imageOnly
}: Props): ReactElement => {
  const getYear = releaseDate ? new Date(releaseDate).getFullYear() : 'Unknown'
  const url = `https://image.tmdb.org/t/p/w500${posterImage}`

  return (
    <Link href={hrefLink} className='
      flex flex-col justify-center gap-2 border border-gray-600 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer
    '
    >
      <Image 
        className='w-full h-auto rounded-t-lg object-cover ' 
        src={url} 
        alt={title ?? ''}
        width={300} 
        height={450} 
        loading='eager' 
      />
      {
        !imageOnly && (
        <div className='p-2'>
          <p className='font-bold truncate text-sm md:text-md lg:text-lg text-gray-300'>{title}</p>
          <p className='text-gray-400 text-sm md:text-md lg:text-lg'>{getYear}</p>
        </div>
        )
      }
    </Link>
  )
}

export default MovieCard
