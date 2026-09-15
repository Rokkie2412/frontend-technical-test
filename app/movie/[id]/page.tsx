'use client'

import { useState, type ReactElement } from 'react';
import { useParams } from 'next/navigation'
import Image from 'next/image';
import { useQuery } from "@tanstack/react-query";

import { axiosFetcher } from "@/libs/axios";
import { MovieCard, Spinner } from '@/components'
import type { MovieDataType } from '@/types';

import { getLinkDetailMovie, getDirector, getMainCast, addLimitCasting } from './utils'
import type { ButtonShowMoreProps, ImageProfileProps, ListMainCastingProps } from './types';

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

const ButtonShowMore = ({
  limitMainCast,
  mainCast,
  setLimitMainCast
}: ButtonShowMoreProps): ReactElement | null => {
  if (mainCast && mainCast?.length >= limitMainCast) {
    return (
      <button 
        onClick={addLimitCasting(setLimitMainCast)} 
        className='border h-18 cursor-pointer rounded-lg col-span-2 mmd:col-span-1'
      >
        <p>Load More Caster...</p>
      </button>
    )
  }

  return null
}

const ListMainCasting = ({
  mainCast
}: ListMainCastingProps): ReactElement[] | null => {
  if (mainCast) {
    return mainCast?.map((item) => (
      <div key={item.order} className='h-full flex flex-col fr'>
        <ImageProfile
          name={item.original_name}
          profilePath={item.profile_path}
        />
      </div>
    ))
  }

  return null
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
            <ListMainCasting mainCast={mainCast}/>
            <ButtonShowMore limitMainCast={limitMainCast} mainCast={mainCast} setLimitMainCast={setLimitMainCast}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage