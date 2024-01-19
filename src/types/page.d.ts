import type { NextPage } from 'next'
import type { ComponentType, ReactElement, ReactNode } from 'react'

export type Page<P = Record<string, any>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
  layout?: ComponentType
}
