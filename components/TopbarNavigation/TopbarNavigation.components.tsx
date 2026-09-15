'use client'

import { useState, type ReactElement } from 'react';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { FILTER_CATEGORIES } from '@/constants'
import { 
  setCategoryParams,
  onChangeInput, 
  setSearchParams 
} from './TopbarNavigation.utils'
import type { FilterButtonProps, SearchInputProps } from './TopbarNavigation.types';

const IconSearch = (): ReactElement => (
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

const ButtonSearch = (): ReactElement => (
  <button
    type='submit'
    className='flex flex-row gap-2 cursor-pointer bg-gray-100 text-zinc-900 p-1 px-3 rounded-lg hover:bg-gray-300'
  >
    <p>Search</p>
  </button>
)

const SearchInput = ({
  search,
  setSearch,
  onSubmit
}: SearchInputProps): ReactElement => (
  <form 
    onSubmit={onSubmit}
    className="
    flex flex-row items-center justify-center gap-2 text-white w-full
    hover:bg-brand-strong shadow-xs font-medium leading-5 border border-gray-700
    rounded-base text-sm px-4 py-2.5 rounded-lg focus:outline-none"
  >
    <IconSearch/>
    <input
      value={search}
      onChange={onChangeInput(setSearch)}
      placeholder="Search movie by title..." 
      className="outline-0 self-center w-full py-1"
    />
    {search && <ButtonSearch/>}
  </form>
)

const FilterButton = ({
  category,
  router,
  isActive
}: FilterButtonProps): ReactElement => (
  <button 
    onClick={setCategoryParams(category.value, router)}
    className={`
      inline-flex items-center justify-center truncate px-6 py-2.5
      text-sm leading-5 cursor-pointer rounded-lg
      transition-all duration-300 ease-in-out font-semibold
      ${isActive
          ? "text-zinc-900 border border-gray-100 bg-gray-100 shadow-sm"
          : "text-gray-300 border border-gray-700 hover:text-white hover:border-gray-300"
      }
    `}
    type="button">
    <p className='text-md'>{category.label}</p>
  </button>
)


const TopBarNavigation = (): ReactElement =>  {
  const [search, setSearch] = useState<string>('')
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className='bg-zinc-900 flex flex-col justify-center items-center '>
      <div className='rounded-lg w-full px-8 md:px-14 lg:px-48 py-6'>
        <SearchInput search={search} setSearch={setSearch} onSubmit={setSearchParams(search, router)}/>
      </div>
      <p className='text-md lg:text-lg'>Filter Movies By</p>
      <div className="w-full overflow-x-auto scroll-smooth py-2 px-4 md:px-8 mb-4 scrollbar-none [&::-webkit-scrollbar]:hidden">
        <div className="flex flex-row items-center gap-2 w-max mx-auto">
          {FILTER_CATEGORIES.map((category) => {
            const isActiveButton = searchParams.get('category') === category.value
            return (
              <div key={category.value} className="shrink-0">
                <FilterButton 
                  category={category} 
                  router={router}
                  isActive={isActiveButton}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TopBarNavigation;