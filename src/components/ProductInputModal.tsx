import { type ChangeEvent, type ReactElement } from 'react'
import ProductInput from '@/components/ProductInput'
import ProductInputModalCancelButton from '@/components/ProductInputModalCancelButton'
import Image from 'next/image'

interface IProductInputModal {
  name: string
  setName: (param: string) => void
  capitalPrice: number
  setCapitalPrice: (param: number) => void
  sellPrice: number
  setSellPrice: (param: number) => void
  stock: number
  setStock: (param: number) => void
  unit: string
  setUnit: (param: string) => void
  imageUrl: string
  setImageUrl: (param: string) => void
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
      return <div className='flex gap-x-4 justify-end mt-auto'>
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
      return <div className='flex gap-x-4 justify-end mt-auto'>
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
      return <div className='flex gap-x-4 justify-end mt-auto'>
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
      return <div className='flex gap-x-4 justify-end mt-auto'>
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
        className='absolute z-20 bg-slate-300 opacity-70 w-screen h-screen top-0 left-0'
        onClick={() => {
          props.setIsProductModalShowed(false)
        }}
      />
      <div className='z-30 bg-white w-4/5 lg:w-3/5 h-3/4 m-auto shadow-xl px-6'>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => { void props.productModalSubmitHandler(event, props.selectedAction) }}
          className='flex flex-col gap-y-3 h-full overflow-y-auto py-6 px-2'
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
          <div className='flex flex-col gap-y-2 my-2'>
            <div className='flex flex-col'>
              {
                props.selectedAction === 'add' || props.selectedAction === 'edit'
                  ? <input
                    type='file'
                    id='productImageInput'
                    accept='image/*'
                    onChange={(event) => { props.onImageChange(event) }}
                  />
                  : props.imageUrl === ''
                    ? <span>No Image</span>
                    : <div className='w-full flex flex-col gap-y-2 justify-center items-center bg-gray-100'>
                      <Image
                        src={`${props.imageUrl}`}
                        className='w-auto h-auto'
                        alt='preview'
                        width={256}
                        height={256}
                      />
                    </div>
              }
            </div>
          </div>
          { renderButtons(props.selectedAction) }
        </form>
      </div>
    </div>
  )
}

export default ProductInputModal
