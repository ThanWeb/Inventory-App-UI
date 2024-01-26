import { type ReactElement, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { HiMiniPlusCircle, HiSquaresPlus } from 'react-icons/hi2'
import DefaultLayout from '@/layouts/default'
import Message from '@/components/Message'
import PaginationTable from '@/components/PaginationTable'
import ProductInputModal from '@/components/ProductInputModal'
import type { RootState } from '@/store/index'
import { type IStateUser } from '@/store/user/action'
import { asyncGetProducts, asyncAddProduct, asyncEditProduct, asyncDeleteProduct } from '@/store/products/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import { type IStateMessage, setMessageActionCreator } from '@/store/message/action'
import type IProduct from '@/types/product'

export default function Home (): ReactElement {
  const dispatch = useDispatch()

  const user: IStateUser | null = useSelector((state: RootState) => state.user)
  const products: IProduct[] | never[] = useSelector((state: RootState) => state.products)
  const message: IStateMessage | null = useSelector((state: RootState) => state.message)

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
    if (user !== null) {
      void dispatch(asyncGetProducts())
    }
  }, [user])

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
    dispatch(setLoadingTrueActionCreator())

    let response = null

    try {
      switch (action) {
      case 'add':
        response = await dispatch(asyncAddProduct({ name, capitalPrice, sellPrice, stock, unit }))
        dispatch(setMessageActionCreator({ error: response.error, text: response.message }))
        break
      case 'edit':
        response = await dispatch(asyncEditProduct({ id, product: { name, capitalPrice, sellPrice, stock, unit } }))
        dispatch(setMessageActionCreator({ error: response.error, text: response.message }))
        break
      case 'delete':
        response = await dispatch(asyncDeleteProduct({ id }))
        dispatch(setMessageActionCreator({ error: response.error, text: response.message }))
        break
      default:
        break
      }

      setIsProductModalShowed(false)
    } catch (error) {
      console.error(error)
    }

    dispatch(setLoadingFalseActionCreator())
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
    <>
      <Head>
        <title>Inventory App</title>
        <meta name='description' content='Inventory App' />
      </Head>
      <div className='flex flex-col py-4 px-6 md:py-6 md:px-12'>
        <div className='container mx-auto flex flex-col items-center gap-y-6'>
          <div className='w-full flex items-start justify-start gap-4 flex-wrap'>
            <button
              type='button'
              onClick={() => { showProductModalForAction('add', null, 0) }}
              className='flex gap-x-2 items-center bg-green-600 text-white px-3 py-2 w-fit'
            >
              <HiMiniPlusCircle className='w-6 h-6 text-white' />
              <span className='whitespace-nowrap'>Tambah Produk</span>
            </button>
            <Link href='/add' className='flex gap-x-2 items-center bg-green-600 text-white px-3 py-2 w-fit'>
              <HiSquaresPlus className='w-6 h-6 text-white' />
              <span className='whitespace-nowrap'>Tambah Beberapa Produk</span>
            </Link>
            <input
              type='text'
              placeholder='Cari item'
              value={searchQuery}
              onChange={(event) => { setSearchQuery(event.target.value) }}
              className='border border-sky-700 hover:border-amber-600 w-full py-3 px-2'
              autoComplete='off'
            />
          </div>
          <PaginationTable
            rawItems={products.filter((product) => { return product.name.toLowerCase().includes(searchQuery.toLowerCase()) })}
            props={{
              searchQuery,
              showProductModalForAction
            }}
          />
        </div>
        <div className={`${isProductModalShowed ? 'fixed z-20' : 'hidden'} w-screen h-screen top-0 left-0`}>
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
      </div>
      <Message message={message} />
    </>
  )
}

Home.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}
