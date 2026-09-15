'use client'

import { useState, type ReactElement } from 'react';
import { useParams } from 'next/navigation'
import { useQuery } from "@tanstack/react-query";

import { axiosFetcher } from "@/libs/axios";
import { getLinkDetailMovie } from '@/utils/index'
import { MovieCard, Spinner } from '@/components'
import { MovieDataType, CrewMovieType, CastMovieType } from '@/types';
import Image from 'next/image';
import { ImageProfileProps } from './types';

const getDirector = (data: MovieDataType): CrewMovieType => {
  const findDirector = (data?.credits?.crew.find((item) => item.job === 'Director') as CrewMovieType)

  return findDirector
}

const getMainCast = (data: MovieDataType, limit: number): CastMovieType[] | undefined => {
  const findMainCast = (data?.credits?.cast.filter((item) => item.order < limit))

  return findMainCast
}

const LoadingScreen = (): ReactElement => (
  <div className='flex flex-1 flex-col w-full h-full justify-center items-center bg-zinc-900'>
    <Spinner height={48} width={48}/>
    <p className='text-gray-500 font-bold mt-6'>Load Movie...</p>
  </div>
)

const ImageProfile = ({
  profilePath,
  name
}: ImageProfileProps): ReactElement => {
  const image = `https://image.tmdb.org/t/p/w185${profilePath}`

  return (
    <div className='flex items-center border object-cover rounded-lg gap-4'>
      <Image
        className='rounded-bl-lg rounded-tl-lg'
        src={image}
        alt={`Photo ${name}`}
        width={50}
        height={75}
      />
      <p className='text-md lg:text-lg'>{name}</p>
    </div>
  )
}

const MovieDetailPage = () => {
  const [limitMainCast, setLimitMainCast] = useState(8)
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

  console.log('data', data)

  const director = getDirector((data) as MovieDataType)
  const mainCast = getMainCast((data) as MovieDataType, limitMainCast)
  const getYear = data?.release_date ? new Date(data?.release_date ).getFullYear() : ''

  console.log('main cast', mainCast);

  if(isPending) {
    return <LoadingScreen/>
  }
  

  return (
    <div className='flex flex-1 flex-col w-full h-full bg-zinc-900 px-8 md:px-14 lg:px-[20%] py-12'>
      <div className='flex flex-col w-full md:flex-row md:justify-center md:items-center'>
        <div className='flex md: justify-center md:mb-8'>
          <MovieCard
            posterImage={data?.poster_path ?? ''}
            width={400}
            imageOnly
          />
        </div>
        <div className='flex flex-col w-full mt-8 mb:mt-2 ml-2 mb:ml-32'>
          <h1 className='text-3xl font-bold space-x-2 text-center md:text-left'>{data?.original_title}</h1>
          <p className='textlg italic text-center md:text-left'>{data?.tagline}</p>
          <p className='text-lg mb-8 text-center md:text-left'>{getYear}</p>
          <p className='text-lg text-justify '>{data?.overview}</p>
        </div>
      </div>
      <div className='mt-4 w-fit'>
        <p className='font-bold mb-2'>Directored By:</p>
        <ImageProfile
          name={director?.original_name}
          profilePath={director?.profile_path}
        />
      </div>
      <div>
        <div className='flex flex-col mt-4 w-full'>
          <p className='font-bold mb-2'>Main Cast:</p>
          <div className='grid grid-cols-2 mmd:grid-cols-3 md:grid-cols-4 gap-4 object-fit'>
            {
              mainCast?.map((item) => (
                <div key={item.order} className='h-full flex flex-col fr'>
                  <ImageProfile
                    name={item.original_name}
                    profilePath={item.profile_path}
                  />
                </div>
              ))
            }
            {
              mainCast && mainCast?.length >= limitMainCast && (
                <button 
                  onClick={() => { setLimitMainCast((prev) => prev + 4) }} 
                  className='border h-18 cursor-pointer rounded-lg col-span-2 mmd:col-span-1'
                >
                  <p>Load More Caster...</p>
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage