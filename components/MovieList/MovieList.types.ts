import type { MovieDataType } from '@/types'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export type Props = {
  movieData: MovieDataType[],
  filter?: string,
  filterText?: string,
  router: AppRouterInstance,
}

export type FilterInfoProps = Omit<Props, 'movieData'>
