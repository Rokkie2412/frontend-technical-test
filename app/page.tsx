'use client'

import { useRef, useEffect, type ReactElement } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from 'next/navigation'

import { axiosFetcher } from '@/libs'
import { MovieList, Spinner, ErrorState, LoadingState } from '@/components'

import { getLinkQuery, getNextPageParam, intersectionObserverEntries } from './utils'
import { InfiniteScrollMovieDate, LoadingMoreMoviesProps } from "./types";

const EmptyState = () => {
  return (
    <div className='flex flex-1 flex-col w-full h-full justify-center items-center bg-zinc-900 pb-8 gap-2'>
      <h1 className="text-2xl font-bold text-center">Currently Our List in Empty</h1>
      <p className="text-lg text-center">Please wait until we update our movie list.</p>
    </div>
  )
}

const LoadingMoreMovies = ({
  isFetchingNextPage, 
  hasNextPage
}: LoadingMoreMoviesProps): ReactElement | null => {
  if(isFetchingNextPage) {
    if(hasNextPage) {
      return (
        <div className='flex flex-col w-full h-full justify-center items-center'>
          <Spinner/>
          <p className='text-gray-500 font-bold mt-2'>Fetching Movies...</p>
        </div>
      )
    } 
    
    return (
      <div className='flex flex-col w-full h-full justify-center items-center bg-zinc-900'>
        <p className='text-gray-500 font-bold mt-6'>All movies have been displayed.</p>
      </div>
    )
  }

  return null
}

const Movies = () => {
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
    refetch
   } = useInfiniteQuery<InfiniteScrollMovieDate, Error>({
    queryKey: ['getMovieList', category],
    initialPageParam: 1,
    queryFn: (query) => axiosFetcher(getLinkQuery(searchParam, category, (query.pageParam) as number)),
    getNextPageParam: getNextPageParam()
  })

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      intersectionObserverEntries(hasNextPage, isFetchingNextPage, fetchNextPage),
      { threshold: 0.5 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const getListMovies = data?.pages.flatMap((page) => page.results) ?? []

  if (isPending) {
    return <LoadingState loadingText="Fetching Movies..."/>
  }

  if (error) {
    return <ErrorState onClick={() => refetch()}/>
  }

  if(getListMovies.length <= 0) {
    return <EmptyState/>
  }
  
  return (
    <main className="flex flex-1 flex-col bg-zinc-900 w-full h-full px-8 md:px-14 lg:px-48 py-6">
      <div className="flex w-full h-full justify-center items-center">
        {data && <MovieList movieData={getListMovies} searchFilter={searchParam} />}
      </div>
      <div ref={observerTarget} className="py-6 text-center">
      <LoadingMoreMovies isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
      </div>

    </main>
  );
}

export default Movies