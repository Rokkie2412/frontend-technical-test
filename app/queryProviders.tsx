'use client'
 
import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
 
let browserQueryClient: QueryClient | undefined
 
const getQueryClient = (): QueryClient => {
  if (typeof window === 'undefined') return new QueryClient()
  browserQueryClient ??= new QueryClient()
  return browserQueryClient
}
 
export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  )
}