import Image from 'next/image'

import type { Props } from './MovieCard.types'

const MovieCard = ({
  posterImage,
  title,
  releaseDate,
  onClick
}: Props) => {
  const getYear = new Date(releaseDate).getFullYear()
  const url = `https://image.tmdb.org/t/p/w500${posterImage}`

  return (
    <div className='
      flex flex-col justify-center gap-2 border border-gray-600 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer
    '
    onClick={onClick}
    >
      <Image 
        className='w-full h-auto rounded-t-lg object-cover' 
        src={url} alt={title} 
        width={300} 
        height={450} 
        loading='eager' 
      />
      <div className='p-2'>
        <p className='font-bold truncate text-sm md:text-md lg:text-lg text-gray-300'>{title}</p>
        <p className='text-gray-400 text-sm md:text-md lg:text-lg'>{getYear}</p>
      </div>
    </div>
  )
}

export default MovieCard
