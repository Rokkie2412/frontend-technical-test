import type { ReactNode } from "react"

import type { MovieDataType } from "@/types";

export type ProviderChildrenType = {
  children: ReactNode
}

export type LoadingMoreMoviesProps = {
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

export type InfiniteScrollMovieDate = {
  page: number;
  results: MovieDataType[];
  total_pages: number;
  total_results: number;

}
