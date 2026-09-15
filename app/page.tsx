'use client'

import { useRef, useEffect, type ReactNode } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from 'next/navigation'
import Image from "next/image";

import { axiosFetcher } from '@/libs/axios'
import { MovieList, Spinner } from '@/components'

import { getLinkQuery } from '../utils'

const LoadingScreen = (): ReactNode => (
  <div className='flex flex-1 flex-col w-full h-full justify-center items-center bg-zinc-900'>
    <Spinner height={48} width={48}/>
    <p className='text-gray-500 font-bold mt-6'>Fetching Movies...</p>
  </div>
)

const LoadingMoreMovies = ({
  isFetchingNextPage, 
  hasNextPage
}: {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}) => {
  if(isFetchingNextPage) {
    if(hasNextPage) {
      return (
        <div className='flex flex-col w-full h-full justify-center items-center'>
          <Spinner/>
          <p className='text-gray-500 font-bold mt-6'>Fetching more movies...</p>
        </div>
      )
    } else {
      return (
        <div className='flex flex-col w-full h-full justify-center items-center bg-zinc-900'>
          <p className='text-gray-500 font-bold mt-6'>All movies have been displayed.</p>
        </div>
      )
    }
  }
}


export default function Home() {
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const pathParams = useSearchParams();
  const category = pathParams.get('category') || '';
  const searchParam = pathParams.get('search') || '';

  const { 
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error,
   } = useInfiniteQuery({
    queryKey: ['getMovieList', category],
    initialPageParam: 1,
    queryFn: (query) => axiosFetcher(getLinkQuery(searchParam, category, query.pageParam)),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  })

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  console.log('data', data)
  
  return (
    
    <main className="flex flex-1 flex-col bg-zinc-900 w-full h-full px-8 md:px-14 lg:px-48 py-6">
       
      {isPending && <LoadingScreen/>}
      <div className="flex w-full h-full justify-center items-center">
        {data && <MovieList movieData={data.pages.flatMap((page) => page.results)} searchFilter={searchParam} />}
      </div>
      <div ref={observerTarget} className="py-6 text-center">
      <LoadingMoreMovies isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
      </div>

    </main>
  );
}
