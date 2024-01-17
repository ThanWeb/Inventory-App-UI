import { Inter } from 'next/font/google'
import { type ReactElement, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncGetProducts, asyncAddProduct, asyncEditProduct, asyncDeleteProduct } from '@/store/products/action'
import type { RootState } from '@/store/index'
import PaginationTable from '@/components/PaginationTable'
import type IProduct from '@/types/product'

const inter = Inter({ subsets: ['latin'] })

export default function Home (): ReactElement {
  const dispatch = useDispatch()

  const products: IProduct[] | never[] = useSelector((state: RootState) => state.products)

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    dispatch(asyncGetProducts())
  }, [dispatch])

  return (
    <main className={`flex flex-col ${inter.className}`}>
      <div>
        <input type='text' placeholder='Cari item' value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value) }}/>
      </div>
      <PaginationTable
        rawItems={products.filter((product) => { return product.name.toLowerCase().includes(searchQuery.toLowerCase()) })}
        props={{
          searchQuery,
          toggleModalHandler: (status: string, items: Record<string, any>) => {},
          toggleDeleteModalHandler: (value: Record<string, any>) => {},
          setDetailModalData: (value?: Record<string, any>) => {},
          setIsDetailModalActive: (value?: boolean) => {}
        }}
      />
    </main>
  )
}
