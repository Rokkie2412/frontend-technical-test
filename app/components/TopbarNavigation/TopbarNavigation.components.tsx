'use client'

import type { ReactNode } from 'react';

import { MovieListCategoryFilter } from '@/app/types/movies.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter, usePathname, useSearchParams, ReadonlyURLSearchParams } from 'next/navigation';

const categories: MovieListCategoryFilter[] = [
    { label: 'Popular', value: 'popular' },
    { label: 'Now Playing', value: 'now_playing' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

const setCategoryParams = (
  categoryName: string, 
  router: AppRouterInstance,
  pathName: string,
  searchParams: ReadonlyURLSearchParams
) => (): void => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('category', categoryName);

    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

const IconSearch = (): ReactNode => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5 text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
)

const searchButton = (): ReactNode => (
  <div className="
    flex flex-row items-center justify-center gap-2 text-white w-full
    hover:bg-brand-strong shadow-xs font-medium leading-5 border border-gray-700
    rounded-base text-sm px-4 py-2.5 rounded-lg focus:outline-none"
  >
    <IconSearch/>
    <input 
      placeholder="Search movie by title, actor, or genres..." 
      className="outline-0 self-center w-full"
    />
  </div>
)

const filterButton = (
  category: MovieListCategoryFilter,
  router: AppRouterInstance,
  pathName: string,
  searchParams: ReadonlyURLSearchParams
): ReactNode => (
  <button 
    onClick={setCategoryParams(category.value, router, pathName, searchParams)}
    className="
      inline-flex items-center justify-center text-white border border-gray-700 transition-all
      hover:border-gray-300 shadow-xs font-medium leading-5 cursor-pointer focus:border-gray-100 duration-300 ease-in-out
      rounded-base text-sm px-6 py-2.5 rounded-lg focus:outline-none text truncate
    " 
    type="button">
    <p className='text-md'>{category.label}</p>
  </button>
)


const TopBarNavigation = (): ReactNode =>  {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className='bg-zinc-900'>
      <div className=' rounded-lg w-full px-8 md:px-14 lg:px-18 py-6'>
        {searchButton()}   
      </div>
      <div className="w-full overflow-x-auto scroll-smooth py-2 px-4 md:px-8 mb-4 scrollbar-none [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-row items-center gap-2 w-max mx-auto">
          {categories.map((category) => (
            <div key={category.value} className="shrink-0">
              {filterButton(category, router, pathName, searchParams)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopBarNavigation;