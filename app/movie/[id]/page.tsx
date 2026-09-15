'use client'

import { useParams } from 'next/navigation'
import { useQuery } from "@tanstack/react-query";

import { axiosFetcher } from "@/libs/axios";
import { getLinkDetailMovie } from '@/utils/index'
import { MovieCard } from '@/components'
import { MovieDataType } from '@/types/movies.types';

const MovieDetailPage = () => {
    const params = useParams()
    const getMovieId = ((params.id ?? '') as string)
    
    const { 
    data,
    isPending,
    error,
   } = useQuery<MovieDataType, Error>({
    queryKey: ['getMovieDetail', getMovieId],
    queryFn: () => axiosFetcher(getLinkDetailMovie(getMovieId)),
  })

  return (
    <div className='flex flex-1 w-full h-full bg-zinc-900 px-8 md:px-14 lg:px-48 py-12'>
      <div className="flex-1/4 grow-0">
        <MovieCard imageOnly posterImage={data?.poster_path ?? ''} />
       </div>
      <div className='flex-1/3'>
        <p className='pl-32 text-justify text-md lg:text-lg'>{data?.overview}</p>
      </div>
    </div>
  )
}

export default MovieDetailPage