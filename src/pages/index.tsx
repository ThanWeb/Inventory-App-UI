import { type ReactElement, useEffect, useState, type ChangeEvent } from 'react'
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
import type { IProduct } from '@/types/product'

export default function Home (): ReactElement {
  const dispatch = useDispatch()

  const sortOption = ['A - Z', 'Z - A', 'Diperbarui (ASC)', 'Diperbarui (DESC)']
  const user: IStateUser | null = useSelector((state: RootState) => state.user)
  const products: IProduct[] | never[] = useSelector((state: RootState) => state.products)
  const message: IStateMessage | null = useSelector((state: RootState) => state.message)

  const [sortBy, setSortBy] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isProductModalShowed, setIsProductModalShowed] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')

  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [capitalPrice, setCapitalPrice] = useState<number | string>(0)
  const [sellPrice, setSellPrice] = useState<number | string>(0)
  const [stock, setStock] = useState<number | string>(0)
  const [unit, setUnit] = useState('')

  const [image, setImage] = useState<Blob | MediaSource | null>(null)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    fetchDataFromLocalStorage()
  }, [])

  useEffect(() => {
    if (image === null) {
      const productImageInput: HTMLInputElement | null = document?.querySelector('input#productImageInput')

      if (productImageInput !== null) {
        productImageInput.value = ''
      }
    }
  }, [image])

  useEffect(() => {
    if (user !== null) {
      void dispatch(asyncGetProducts())
    }
  }, [user])

  const fetchDataFromLocalStorage = (): void => {
    const localSortBy = localStorage.getItem('sortBy')

    if (localSortBy !== null) {
      setSortBy(localSortBy)
    }
  }

  const showProductModalForAction = (action: string, product: IProduct | null, selectedId: number): void => {
    setIsProductModalShowed(true)
    setSelectedAction(action)

    if (action === 'add') {
      setName('')
      setCapitalPrice(0)
      setSellPrice(0)
      setStock(0)
      setUnit('')
      setImage(null)
    } else {
      if (product !== null) {
        setId(selectedId)
        setName(product.name)
        setCapitalPrice(product.capitalPrice)
        setSellPrice(product.sellPrice)
        setStock(product.stock)
        setUnit(product.unit)
        setImageUrl(product.imageUrl ?? '')
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
        response = await dispatch(asyncAddProduct({ product: { name, capitalPrice, sellPrice, stock, unit }, image }))
        dispatch(setMessageActionCreator({ error: response.error, text: response.message }))
        setImage(null)
        break
      case 'edit':
        response = await dispatch(asyncEditProduct({ id, product: { name, capitalPrice, sellPrice, stock, unit }, image }))
        dispatch(setMessageActionCreator({ error: response.error, text: response.message }))
        setImage(null)
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

  const updateNumberInputHandler = (propName: string, value: string): void => {
    switch (propName) {
    case 'capitalPrice':
      setCapitalPrice(checkNumberInputValue(value))
      break
    case 'sellPrice':
      setSellPrice(checkNumberInputValue(value))
      break
    case 'stock':
      setStock(checkNumberInputValue(value))
      break
    default:
      break
    }
  }

  const checkNumberInputValue = (value: string): string | number => {
    if (value === '') {
      return value
    } else if (value[0] === '0' && value.length > 1) {
      return value.slice(1)
    } else {
      return parseInt(value)
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
        product[0].unit !== unit ||
        image !== null
      ) {
        return true
      } else {
        return false
      }
    }

    return false
  }

  const changeSortBy = (value: string): void => {
    setSortBy(value)
    localStorage.setItem('sortBy', value)
  }

  const sortProduct = (products: IProduct[]): IProduct[] => {
    if (products.length > 0) {
      switch (sortBy) {
      case sortOption[0]:
        return [...products].sort((a, b) => { if (a.name < b.name) { return -1 } return 1 })
      case sortOption[1]:
        return [...products].sort((a, b) => { if (a.name > b.name) { return -1 } return 1 })
      case sortOption[2]:
        return [...products].sort((a, b) => { if (a.updatedAt !== undefined && b.updatedAt !== undefined && a.updatedAt > b.updatedAt) { return -1 } return 1 })
      case sortOption[3]:
        return [...products].sort((a, b) => { if (a.updatedAt !== undefined && b.updatedAt !== undefined && a.updatedAt < b.updatedAt) { return -1 } return 1 })
      default:
        return [...products]
      }
    } else {
      return []
    }
  }

  const onImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files !== null) {
      if (event.target.files[0] !== undefined) {
        const type = `${event.target.files[0].type}`

        if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg' || type === 'image/webp') {
          if (event.target.files[0].size > 3e6) {
            dispatch(setMessageActionCreator({ error: true, text: 'Upload Gambar Maksimal 3 mb' }))
          } else {
            setImageUrl(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
          }
        } else {
          dispatch(setMessageActionCreator({ error: true, text: 'Ekstensi Gambar tidak didukung' }))
        }
      }
    }
  }

  return (
    <>
      <Head>
        <title>Inventory App</title>
        <meta
          name='description'
          content='Inventory App'
        />
      </Head>
      <div className='flex flex-col py-4 px-6 md:py-6 md:px-12 lg:w-9/12 xl:w-10/12 ml-auto'>
        <div className='container mx-auto flex flex-col items-center gap-y-3'>
          <div className='w-full flex items-start justify-start gap-3 flex-wrap whitespace-nowrap'>
            <button
              type='button'
              onClick={() => { showProductModalForAction('add', null, 0) }}
              className='flex gap-x-2 items-center bg-green-600 text-white px-3 py-2 w-fit'
            >
              <HiMiniPlusCircle className='w-6 h-6 text-white' />
              <span>Tambah Produk</span>
            </button>
            <Link
              href='/add'
              className='flex gap-x-2 items-center bg-green-600 text-white px-3 py-2 w-fit'
            >
              <HiSquaresPlus className='w-6 h-6 text-white' />
              <span>Tambah Beberapa Produk</span>
            </Link>
            <input
              type='text'
              placeholder='Cari item'
              value={searchQuery}
              onChange={(event) => { setSearchQuery(event.target.value) }}
              className='border border-sky-700 hover:border-amber-600 w-full my-1 py-3 px-2'
              autoComplete='off'
            />
          </div>
          <PaginationTable
            rawItems={sortProduct(products.filter((product) => { return product.name.toLowerCase().includes(searchQuery.toLowerCase()) }))}
            props={{
              searchQuery,
              showProductModalForAction,
              sortOption,
              sortBy,
              changeSortBy
            }}
          />
        </div>
        <div className={`${isProductModalShowed ? 'fixed z-20' : 'hidden'} w-screen h-screen top-0 left-0`}>
          <ProductInputModal
            props={{
              name,
              setName,
              capitalPrice,
              setCapitalPrice: updateNumberInputHandler,
              sellPrice,
              setSellPrice: updateNumberInputHandler,
              stock,
              setStock: updateNumberInputHandler,
              unit,
              setUnit,
              imageUrl,
              setImageUrl,
              onImageChange,
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
