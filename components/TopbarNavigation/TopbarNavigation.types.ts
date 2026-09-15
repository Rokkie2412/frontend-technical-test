import type{ Dispatch, SetStateAction } from "react"
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import type { ReadonlyURLSearchParams } from "next/navigation"

import { MovieListCategoryFilter } from "../../../types/movies.types"

export type FilterButtonProps = {
  category: MovieListCategoryFilter,
  router: AppRouterInstance,
  isActive?: boolean
}

export type Setter<T> = Dispatch<SetStateAction<T>>

export type SearchInputProps = {
  setSearch: Setter<string>,
  search: string,
  onSubmit: () => void
}
