'use client'
import React, { PropsWithChildren } from 'react'
import {QueryClient,QueryClientProvider as ReactQueryClientProvider} from "@tanstack/react-query"

const queryClinet = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClinet}>
      {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider
