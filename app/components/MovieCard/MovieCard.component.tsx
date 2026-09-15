import Image from 'next/image'

import type { Props } from './MovieCard.types'

const MovieCard = ({
  posterImage,
  title,
  releaseDate
}: Props) => {
  const getYear = new Date(releaseDate).getFullYear()
  const url = `https://image.tmdb.org/t/p/w500${posterImage}`

  return (
    <div className='
      flex flex-col justify-center gap-2 border border-gray-600 rounded-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer
      
    '>
      <Image 
        className='w-full h-auto rounded-t-lg object-cover' 
        src={url} alt={title} 
        width={300} 
        height={450} 
        loading='eager' 
      />
      <div className='p-2'>
        <p>{title}</p>
        <p>{getYear}</p>
      </div>
    </div>
  )
}

export default MovieCard
