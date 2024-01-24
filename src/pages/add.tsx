import { type ReactElement, useState } from 'react'
import Head from 'next/head'
import { HiMiniPlusCircle, HiMiniMinusCircle, HiCheckCircle } from 'react-icons/hi2'
import DefaultLayout from '@/layouts/default'
import ProductInput from '@/components/ProductInput'
import type IProduct from '@/types/product'

export default function Add (): ReactElement {
  const product: IProduct = {
    name: '',
    capitalPrice: 0,
    sellPrice: 0,
    stock: 0,
    unit: ''
  }

  const [productInputs, setProductInputs] = useState<IProduct[]>([product])

  const addFields = (): void => {
    setProductInputs([...productInputs, product])
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
        // eslint-disable-next-line no-useless-escape
        newProductInputs[index][attr] = value
      } else if (attr === 'capitalPrice' || attr === 'sellPrice' || attr === 'stock') {
        newProductInputs[index][attr] = parseInt(value)
      }

      setProductInputs(newProductInputs)
    }
  }

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    console.log('submit')
  }

  return (
    <>
      <Head>
        <title>Inventory App</title>
        <meta name='description' content='Sign in to flynar website' />
      </Head>
      <div className='py-4 px-6 md:py-6 md:px-12 container mx-auto'>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => { void onSubmitHandler(event) }}
          className='flex flex-col gap-y-8'
        >
          <div className='flex flex-col justify-start md:flex-row md:justify-between md:items-center gap-4'>
            <h1 className='text-xl font-semibold text-left drop-shadow'>Tambah Produk</h1>
            <div className='grid grid-cols-2 gap-2 md:flex md:justify-end md:gap-4 md:flex-wrap'>
              <button
                type='button'
                onClick={addFields}
                className='flex gap-x-2 items-center bg-green-600 text-white px-3 py-2 w-full md:w-fit'
              >
                <HiMiniPlusCircle className='w-6 h-6 text-green-200' />
                <span className='whitespace-nowrap'>Tambah Kolom</span>
              </button>
              <button
                type='button'
                onClick={removeLastField}
                className={`flex gap-x-2 items-center ${productInputs.length <= 1 ? 'bg-slate-500' : 'bg-amber-600'} text-white px-3 py-2 w-full md:w-fit`}
                disabled={productInputs.length <= 1}
              >
                <HiMiniMinusCircle className='w-6 h-6 text-green-200' />
                <span className='whitespace-nowrap'>Kurangi Kolom</span>
              </button>
              <button
                type='submit'
                className='flex gap-x-2 items-center bg-sky-600 text-white px-3 py-2 w-full md:w-fit'
              >
                <HiCheckCircle className='w-6 h-6 text-green-200' />
                <span className='whitespace-nowrap'>Simpan</span>
              </button>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
              productInputs.map((input, index) =>
                <div key={index} className='flex flex-col gap-y-3 shadow-md p-6'>
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
