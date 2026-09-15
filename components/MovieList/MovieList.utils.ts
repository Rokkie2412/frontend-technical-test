import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const onClearFilter = (router: AppRouterInstance) => (): void => {
  if (router) {
    router.push("/")
  }
}
