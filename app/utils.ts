import type { Setter } from "@/types";

import type { InfiniteScrollMovieDate } from "./types";

const _getLinkMoviesCategory = (category: string, page: number): string => {
  let url = ''

  if (category === 'now_playing') {
    url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
  } else if (category === 'popular') {
    url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  } else if (category === 'top_rated') {
    url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
  } else if (category === 'upcoming') {
    url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
  }
  
  return url;
}

export const getLinkQuery = (search: string, category: string, page: number): string => {
  if (search) {
    return `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=${page}`
  }

  if(category) {
    return _getLinkMoviesCategory(category, page)
  }

  return `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`
}

export const getNextPageParam = () => (lastPage: InfiniteScrollMovieDate): number | undefined => {
  if (lastPage.page < lastPage.total_pages) {
    return lastPage.page + 1;
  }
  
  return undefined;
}

export const intersectionObserverEntries = (
  hasNextPage: boolean, 
  isFetchingNextPage: boolean, 
  fetchNextPage: () => void
) => (entries: IntersectionObserverEntry[]): void => {
  if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}

export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const setToggleVisibility = (setShowFloatingButton: Setter<boolean>) => (): void => {
  if (window.scrollY > 500) {
    setShowFloatingButton(true);
  } else {
    setShowFloatingButton(false);
  }
};