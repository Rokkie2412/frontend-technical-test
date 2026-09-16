'use client'

import { useRef, type ReactElement, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from 'next/navigation'

import { axiosFetcher } from '@/libs'
import { MovieList, Spinner, ErrorState, LoadingState } from '@/components'

import { getLinkQuery, getNextPageParam, scrollToTop, formatFilterByCategory } from './utils'
import type { InfiniteScrollMovieDate, LoadingMoreMoviesProps } from "./types";
import { useScrollListener, useTriggerInfiniteQuery } from './hooks'

const EmptyState = () => {
  return (
    <div className='flex flex-1 flex-col w-full h-full justify-center items-center bg-zinc-900 pb-8 gap-2'>
      <h1 className="text-2xl font-bold text-center">Currently Our List in Empty</h1>
      <p className="text-lg text-center">Please wait until we update our movie list.</p>
    </div>
  )
}

const GoTopButton = () => {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full
        bg-gray-100 text-zinc-900 cursor-pointer
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
};

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
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const pathParams = useSearchParams();
  const router = useRouter()
  const categoryParam = pathParams.get('category') || '';
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
    queryKey: ['getMovieList', categoryParam, searchParam],
    initialPageParam: 1,
    queryFn: (query) => axiosFetcher(getLinkQuery(searchParam, categoryParam, (query.pageParam) as number)),
    getNextPageParam: getNextPageParam()
  })

  useTriggerInfiniteQuery(observerTarget, hasNextPage, isFetchingNextPage, fetchNextPage)

  useScrollListener(setShowFloatingButton)

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
      {showFloatingButton && <GoTopButton/>}
      <div className="flex w-full h-full justify-center items-center">
        <MovieList 
          router={router}
          movieData={getListMovies} 
          filter={searchParam ? searchParam : formatFilterByCategory(categoryParam)}
          filterText={searchParam ? "Search Filter:" : "Category Filter:"}
        />
      </div>
      <div ref={observerTarget} className="py-6 text-center">
      <LoadingMoreMovies isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
      </div>
    </main>
  );
}

export default Movies