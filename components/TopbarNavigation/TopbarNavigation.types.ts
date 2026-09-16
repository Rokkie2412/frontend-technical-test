import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

import type { Setter } from '@/types'
import type { ReadonlyURLSearchParams } from "next/navigation";

export type MovieListCategoryFilter = { 
  label: string;
  value: string;
}

export type FilterButtonProps = {
  category: MovieListCategoryFilter,
  router: AppRouterInstance,
  isActive?: boolean
}

export type SearchInputProps = {
  setSearch: Setter<string>,
  search: string,
  onSubmit: () => void
}

export type FilterButtonContainerProps = {
  searchParams: ReadonlyURLSearchParams
  router: AppRouterInstance
}