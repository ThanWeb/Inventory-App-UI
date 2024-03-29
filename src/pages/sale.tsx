import { useState, type ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { HiMiniPlusCircle, HiMiniMinusCircle, HiCheckCircle } from 'react-icons/hi2'
import DefaultLayout from '@/layouts/default'
import Message from '@/components/Message'
import CartInput from '@/components/CartInput'
import { type RootState } from '@/store'
import { setMessageActionCreator, type IStateMessage } from '@/store/message/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import { asyncGetProducts } from '@/store/products/action'
import { type IStateUser } from '@/store/user/action'
import type { IProduct } from '@/types/product'
import type ICart from '@/types/cart'
import api from '@/utils/api'

export default function Sale (): ReactElement {
  const router = useRouter()
  const dispatch = useDispatch()

  const user: IStateUser | null = useSelector((state: RootState) => state.user)
  const message: IStateMessage | null = useSelector((state: RootState) => state.message)
  const products: IProduct[] | never[] = useSelector((state: RootState) => state.products)

  const [cartInput, setCartInput] = useState<ICart[]>([
    {
      name: '',
      total: 0,
      sellPrice: 0
    }
  ])

  useEffect(() => {
    if (user !== null) {
      void dispatch(asyncGetProducts())
    }
  }, [user])

  const addFields = (): void => {
    setCartInput([...cartInput, {
      name: '',
      total: 0,
      sellPrice: 0
    }])
  }

  const removeLastField = (): void => {
    setCartInput(
      cartInput.filter((input, index) => {
        return index !== cartInput.length - 1
      })
    )
  }

  const handleFieldChange = (index: number, attr: string, value: string): void => {
    const attributes = ['name', 'total']

    if (attributes.includes(attr)) {
      const newCartInput = [...cartInput]

      if (attr === 'name') {
        newCartInput[index][attr] = value

        const product = products.find(item => item.name === value)
        if (product !== undefined) {
          newCartInput[index].sellPrice = product.sellPrice
        } else {
          newCartInput[index].sellPrice = 0
        }
      } else if (attr === 'total') {
        if (value === '') {
          newCartInput[index][attr] = value
        } else if (value[0] === '0' && value.length > 1) {
          newCartInput[index][attr] = value.slice(1)
        } else {
          newCartInput[index][attr] = parseInt(value)
        }
      }

      setCartInput(newCartInput)
    }
  }

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    dispatch(setLoadingTrueActionCreator())

    const response = await api.addTransactionAdmin({ cart: cartInput })

    if (!response.error) {
      setTimeout(() => {
        void router.push('/transaction')
      }, 2000)
    }

    dispatch(setMessageActionCreator({ error: response.error, text: response.message }))
    dispatch(setLoadingFalseActionCreator())
  }

  return (
    <>
      <Head>
        <title>Sale | Inventory App</title>
        <meta
          name='description'
          content='Sale Product Inventory App'
        />
      </Head>
      <div className='flex flex-col py-4 px-6 md:py-6 md:px-12 lg:w-9/12 xl:w-10/12 ml-auto'>
        <div className='container mx-auto flex flex-col items-center gap-y-3'>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => { void onSubmitHandler(event) }}
            className='flex flex-col gap-y-8 w-full'
          >
            <div className='flex flex-col justify-start md:flex-row md:justify-between md:items-center gap-4'>
              <h1 className='text-xl font-semibold text-left drop-shadow'>Tambah Penjualan</h1>
              <div className='grid grid-cols-2 gap-2 md:flex md:justify-end md:gap-4 md:flex-wrap whitespace-nowrap'>
                <button
                  type='button'
                  onClick={addFields}
                  className='flex gap-x-2 items-center bg-green-600 text-white px-3 py-2 w-full md:w-fit'
                >
                  <HiMiniPlusCircle className='w-6 h-6 text-white' />
                  <span>Tambah Kolom</span>
                </button>
                <button
                  type='button'
                  onClick={removeLastField}
                  className={`flex gap-x-2 items-center ${cartInput.length <= 1 ? 'bg-slate-500' : 'bg-amber-600'} text-white px-3 py-2 w-full md:w-fit`}
                  disabled={cartInput.length <= 1}
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
                cartInput.map((input, index) =>
                  <div
                    key={index}
                    className='flex flex-col gap-y-3 shadow-md p-6'
                  >
                    <CartInput
                      props={{
                        index,
                        name: input.name,
                        total: input.total,
                        sellPrice: input.sellPrice,
                        products: products.filter(item => item.name.toLowerCase().match(input.name.toLowerCase()) !== null),
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

Sale.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}
