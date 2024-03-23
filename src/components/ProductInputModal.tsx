import { type ChangeEvent, type ReactElement } from 'react'
import ProductInput from '@/components/ProductInput'
import ProductInputModalCancelButton from '@/components/ProductInputModalCancelButton'
import Image from 'next/image'

interface IProductInputModal {
  name: string
  setName: (param: string) => void
  capitalPrice: number | string
  setCapitalPrice: (propName: string, value: string) => void
  sellPrice: number | string
  setSellPrice: (propName: string, value: string) => void
  stock: number | string
  setStock: (propName: string, value: string) => void
  unit: string
  setUnit: (param: string) => void
  imageUrl: string
  imageInputUrl: string
  setImageInputUrl: (param: string) => void
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void
  selectedAction: string
  isThereAnyChange: boolean
  setIsProductModalShowed: (param: boolean) => void
  productModalSubmitHandler: (event: React.FormEvent<HTMLFormElement>, param: string) => Promise<void>
}

interface IProps {
  props: IProductInputModal
}

const ProductInputModal = ({ props }: IProps): ReactElement => {
  const renderButtons = (action: string): ReactElement => {
    switch (action) {
    case 'add':
      return <div className='flex gap-x-4 justify-end mt-auto pt-4'>
        <ProductInputModalCancelButton
          props={{
            text: 'Batal',
            setIsProductModalShowed: props.setIsProductModalShowed
          }}
        />
        <button
          type='submit'
          className='rounded-lg bg-green-600 py-2 px-6 text-white'
        >
          Tambah
        </button>
      </div>
    case 'edit':
      return <div className='flex gap-x-4 justify-end mt-auto pt-4'>
        <ProductInputModalCancelButton
          props={{
            text: 'Batal',
            setIsProductModalShowed: props.setIsProductModalShowed
          }}
        />
        <button
          type='submit'
          disabled={!props.isThereAnyChange}
          className='rounded-lg bg-amber-500 py-2 px-6 text-white'
        >
          Ubah
        </button>
      </div>
    case 'delete':
      return <div className='flex gap-x-4 justify-end mt-auto pt-4'>
        <ProductInputModalCancelButton
          props={{
            text: 'Batal',
            setIsProductModalShowed: props.setIsProductModalShowed
          }}
        />
        <button
          type='submit'
          className='rounded-lg bg-red-600 py-2 px-6 text-white'
        >
          Hapus
        </button>
      </div>
    default:
      return <div className='flex gap-x-4 justify-end mt-auto pt-4'>
        <ProductInputModalCancelButton
          props={{
            text: 'Tutup',
            setIsProductModalShowed: props.setIsProductModalShowed
          }}
        />
      </div>
    }
  }

  return (
    <div className='w-full h-full relative top-0 left-0 flex'>
      <div
        className='absolute z-20 bg-slate-300 opacity-70 w-screen h-screen top-0 left-0 cursor-pointer'
        onClick={() => {
          props.setIsProductModalShowed(false)
        }}
      />
      <div className='z-30 bg-white w-4/5 lg:w-3/5 h-3/4 m-auto shadow-xl'>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => { void props.productModalSubmitHandler(event, props.selectedAction) }}
          className='flex flex-col gap-y-3 h-full overflow-y-auto py-6 px-8'
        >
          <ProductInput
            props={{
              index: 0,
              isDynamic: false,
              name: props.name,
              setName: props.setName,
              capitalPrice: props.capitalPrice,
              setCapitalPrice: props.setCapitalPrice,
              sellPrice: props.sellPrice,
              setSellPrice: props.setSellPrice,
              stock: props.stock,
              setStock: props.setStock,
              unit: props.unit,
              setUnit: props.setUnit,
              selectedAction: props.selectedAction,
              handleFieldChange: () => {}
            }}
          />
          <div className='flex flex-col gap-y-5'>
            {
              props.selectedAction !== 'add'
                ? props.imageUrl === ''
                  ? <span>No Image</span>
                  : <div className='w-full flex flex-col gap-y-2 justify-center items-center'>
                    <span className='bg-white'>Previous Image</span>
                    <div className='bg-gray-100 w-full flex justify-center'>
                      <Image
                        src={`${props.imageUrl}`}
                        className='w-auto h-40'
                        alt='Previous Image'
                        width={256}
                        height={256}
                        loading={'lazy'}
                      />
                    </div>
                  </div>
                : null
            }
            {
              (props.selectedAction === 'add' || props.selectedAction === 'edit') &&
                <input
                  type='file'
                  id='productImageInput'
                  accept='image/*'
                  className={`${props.selectedAction === 'add' && 'mt-3'}`}
                  onChange={(event) => { props.onImageChange(event) }}
                />
            }
            {
              props.imageInputUrl !== '' &&
                <div className='w-full flex flex-col gap-y-2 justify-center items-center bg-gray-100'>
                  <Image
                    src={`${props.imageInputUrl}`}
                    className='w-auto h-40'
                    alt='Input Preview Image'
                    width={256}
                    height={256}
                    loading={'lazy'}
                  />
                </div>
            }
          </div>
          { renderButtons(props.selectedAction) }
        </form>
      </div>
    </div>
  )
}

export default ProductInputModal
