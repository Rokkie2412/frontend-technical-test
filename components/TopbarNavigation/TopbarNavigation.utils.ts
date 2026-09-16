import type { ChangeEvent } from "react";
import type { SubmitEvent } from 'react';
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import type { Setter } from "@/types";

export const setCategoryParams = (
  categoryName: string, 
  router: AppRouterInstance,
) => (): void => {
  if (!categoryName) {
    return
  }

  const params = new URLSearchParams();

  params.set('category', categoryName);

  router.push(`/?${params.toString()}`, { scroll: false });
};

export const setSearchParams = (
  seachInput: string, 
  router: AppRouterInstance,
  setSearch: Setter<string>
) => (event: SubmitEvent<HTMLFormElement>): void => {
  event.preventDefault();

  if (!seachInput) {
    return
  }

  const params = new URLSearchParams();

  params.set('search', seachInput);

  router.push(`/?${params.toString()}`, { scroll: false });
  
  setSearch('')
};

export const onChangeInput = (setter: Setter<string>) => (e: ChangeEvent<HTMLInputElement, HTMLInputElement>): void => {
  setter(e.target.value)
}
