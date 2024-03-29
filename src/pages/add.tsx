import { type ReactElement, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { HiMiniPlusCircle, HiMiniMinusCircle, HiCheckCircle } from 'react-icons/hi2'
import DefaultLayout from '@/layouts/default'
import ProductInput from '@/components/ProductInput'
import Message from '@/components/Message'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import { asyncAddMultipleProduct } from '@/store/products/action'
import { type IStateMessage, setMessageActionCreator } from '@/store/message/action'
import { type RootState } from '@/store'
import type { IProductInput } from '@/types/product'

export default function Add (): ReactElement {
  const router = useRouter()
  const dispatch = useDispatch()

  const message: IStateMessage | null = useSelector((state: RootState) => state.message)
  const [productInputs, setProductInputs] = useState<IProductInput[]>([
    {
      name: '',
      capitalPrice: 0,
      sellPrice: 0,
      stock: 0,
      unit: ''
    }
  ])

  const addFields = (): void => {
    setProductInputs([...productInputs, {
      name: '',
      capitalPrice: 0,
      sellPrice: 0,
      stock: 0,
      unit: ''
    }])
  }

  const removeLastField = (): void => {
    setProductInputs(
      productInputs.filter((input, index) => {
        return index !== productInputs.length - 1
      })
    )
  }

  const handleFieldChange = (index: number, attr: string, value: string): void => {
    const attributes = ['name', 'capitalPrice', 'sellPrice', 'stock', 'unit']

    if (attributes.includes(attr)) {
      const newProductInputs = [...productInputs]

      if (attr === 'name' || attr === 'unit') {
        newProductInputs[index][attr] = value
      } else if (attr === 'capitalPrice' || attr === 'sellPrice' || attr === 'stock') {
        if (value === '') {
          newProductInputs[index][attr] = value
        } else if (value[0] === '0' && value.length > 1) {
          newProductInputs[index][attr] = value.slice(1)
        } else {
          newProductInputs[index][attr] = parseInt(value)
        }
      }

      setProductInputs(newProductInputs)
    }
  }

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    dispatch(setLoadingTrueActionCreator())

    const names = productInputs.map((product) => { return product.name.toLowerCase() })
    const duplicates = names.filter((value, index) => names.indexOf(value) !== index)

    if (duplicates.length > 0) {
      dispatch(setMessageActionCreator({ error: true, text: 'Nama Produk Duplikat' }))
      dispatch(setLoadingFalseActionCreator())
      return
    }

    const response = await dispatch(asyncAddMultipleProduct({ products: productInputs }))

    if (!response.error) {
      setProductInputs([{
        name: '',
        capitalPrice: 0,
        sellPrice: 0,
        stock: 0,
        unit: ''
      }])

      void router.push('/')
    }

    dispatch(setMessageActionCreator({ error: response.error, text: response.message }))
    dispatch(setLoadingFalseActionCreator())
  }

  return (
    <>
      <Head>
        <title>Add Product | Inventory App</title>
        <meta
          name='description'
          content='Add Product Inventory App'
        />
      </Head>
      <div className='flex flex-col py-4 px-6 md:py-6 md:px-12 lg:w-9/12 xl:w-10/12 ml-auto'>
        <div className='container mx-auto flex flex-col items-center gap-y-3'>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => { void onSubmitHandler(event) }}
            className='flex flex-col gap-y-8 w-full'
          >
            <div className='flex flex-col justify-start md:flex-row md:justify-between md:items-center gap-4'>
              <h1 className='text-xl font-semibold text-left drop-shadow'>Tambah Produk</h1>
              <div className='grid grid-cols-2 gap-2 md:flex md:justify-end md:gap-4 md:flex-wrap whitespace-nowrap'>
                <button
                  type='button'
                  onClick={addFields}
                  className={`flex gap-x-2 items-center ${productInputs.length >= 10 ? 'bg-slate-500' : 'bg-green-600'} text-white px-3 py-2 w-full md:w-fit`}
                  disabled={productInputs.length >= 10}
                >
                  <HiMiniPlusCircle className='w-6 h-6 text-white' />
                  <span>Tambah Kolom</span>
                </button>
                <button
                  type='button'
                  onClick={removeLastField}
                  className={`flex gap-x-2 items-center ${productInputs.length <= 1 ? 'bg-slate-500' : 'bg-amber-600'} text-white px-3 py-2 w-full md:w-fit`}
                  disabled={productInputs.length <= 1}
                >
                  <HiMiniMinusCircle className='w-6 h-6 text-white' />
                  <span>Kurangi Kolom</span>
                </button>
                <button
                  type='submit'
                  className='flex gap-x-2 items-center bg-sky-600 text-white px-3 py-2 w-full md:w-fit'
                >
                  <HiCheckCircle className='w-6 h-6 text-white' />
                  <span>Simpan</span>
                </button>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {
                productInputs.map((input, index) =>
                  <div
                    key={index}
                    className='flex flex-col gap-y-3 shadow-lg p-6'
                  >
                    <ProductInput
                      props={{
                        index,
                        isDynamic: true,
                        name: input.name,
                        setName: () => {},
                        capitalPrice: input.capitalPrice,
                        setCapitalPrice: () => {},
                        sellPrice: input.sellPrice,
                        setSellPrice: () => {},
                        stock: input.stock,
                        setStock: () => {},
                        unit: input.unit,
                        setUnit: () => {},
                        selectedAction: 'add',
                        handleFieldChange
                      }}
                    />
                  </div>
                )
              }
            </div>
          </form>
        </div>
      </div>
      <Message message={message} />
    </>
  )
}

Add.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}
