import { type RefObject, useEffect } from "react";

import type { Setter } from "@/types";

import { setToggleVisibility, intersectionObserverEntries } from './utils'

export const useScrollListener = (setShowFloatingButton: Setter<boolean>) => {
  useEffect(() => {
    setToggleVisibility(setShowFloatingButton)

    window.addEventListener('scroll', setToggleVisibility(setShowFloatingButton));

    return () => window.removeEventListener('scroll', setToggleVisibility(setShowFloatingButton));
  }, []);
}

export const useTriggerInfiniteQuery = (
  ref: RefObject<HTMLDivElement | null>,
  hasNextPage: boolean, 
  isFetchingNextPage: boolean, 
  fetchNextPage: () => void
) => {
  useEffect(() => {
    const target = ref?.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      intersectionObserverEntries(hasNextPage, isFetchingNextPage, fetchNextPage),
      { threshold: 0.5 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
}