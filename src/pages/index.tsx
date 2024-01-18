import { Inter } from 'next/font/google'
import { type ReactElement, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { asyncGetProducts, asyncAddProduct, asyncEditProduct, asyncDeleteProduct } from '@/store/products/action'
import type { RootState } from '@/store/index'
import PaginationTable from '@/components/PaginationTable'
import ProductInputModal from '@/components/ProductInputModal'
import type IProduct from '@/types/product'

const inter = Inter({ subsets: ['latin'] })

export default function Home (): ReactElement {
  const dispatch = useDispatch()

  const products: IProduct[] | never[] = useSelector((state: RootState) => state.products)

  const [searchQuery, setSearchQuery] = useState('')
  const [isProductModalShowed, setIsProductModalShowed] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')

  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [capitalPrice, setCapitalPrice] = useState(0)
  const [sellPrice, setSellPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [unit, setUnit] = useState('')

  useEffect(() => {
    dispatch(asyncGetProducts())
  }, [dispatch])

  const showProductModalForAction = (action: string, product: IProduct | null, selectedId: number): void => {
    setIsProductModalShowed(true)
    setSelectedAction(action)

    if (action === 'add') {
      setName('')
      setCapitalPrice(0)
      setSellPrice(0)
      setStock(0)
      setUnit('')
    } else {
      if (product !== null) {
        setId(selectedId)
        setName(product.name)
        setCapitalPrice(product.capitalPrice)
        setSellPrice(product.sellPrice)
        setStock(product.stock)
        setUnit(product.unit)
      }
    }
  }

  const productModalSubmitHandler = async (event: React.FormEvent<HTMLFormElement>, action: string): Promise<void> => {
    event.preventDefault()

    try {
      switch (action) {
      case 'add':
        await dispatch(asyncAddProduct({ name, capitalPrice, sellPrice, stock, unit }))
        break
      case 'edit':
        await dispatch(asyncEditProduct({ id, product: { name, capitalPrice, sellPrice, stock, unit } }))
        break
      case 'delete':
        await dispatch(asyncDeleteProduct({ id }))
        break
      default:
        break
      }

      setIsProductModalShowed(false)
    } catch (error) {
      console.error(error)
    }
  }

  const checkIsThereAnyChange = (): boolean => {
    const product = products.filter((item) => item.id === id)

    if (product.length > 0) {
      if (
        product[0].name !== name ||
        product[0].capitalPrice !== capitalPrice ||
        product[0].sellPrice !== sellPrice ||
        product[0].stock !== stock ||
        product[0].unit !== unit
      ) {
        return true
      } else {
        return false
      }
    }

    return false
  }

  return (
    <main className={`flex flex-col ${inter.className}`}>
      <div className='container mx-auto flex flex-col items-center'>
        <div>
          <button type='button' onClick={() => { showProductModalForAction('add', null, 0) }} >Tambah</button>
          <input type='text' placeholder='Cari item' value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value) }}/>
        </div>
        <PaginationTable
          rawItems={products.filter((product) => { return product.name.toLowerCase().includes(searchQuery.toLowerCase()) })}
          props={{
            searchQuery,
            showProductModalForAction
          }}
        />
      </div>
      <div className={`${isProductModalShowed ? 'fixed z-50' : 'hidden'} w-screen h-screen`}>
        <ProductInputModal
          props={{
            name,
            setName,
            capitalPrice,
            setCapitalPrice,
            sellPrice,
            setSellPrice,
            stock,
            setStock,
            unit,
            setUnit,
            selectedAction,
            isThereAnyChange: checkIsThereAnyChange(),
            setIsProductModalShowed,
            productModalSubmitHandler
          }}
        />
      </div>
    </main>
  )
}
