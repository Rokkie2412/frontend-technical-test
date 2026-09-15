'use client'
 
import type { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProviderChildrenType } from './types'
 
const Providers = ({ 
  children 
}: ProviderChildrenType): ReactElement => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default Providers