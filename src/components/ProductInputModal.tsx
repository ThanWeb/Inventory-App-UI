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
  deleteImage: () => void
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
            deleteImage: props.deleteImage,
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
            deleteImage: props.deleteImage,
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
            deleteImage: props.deleteImage,
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
            deleteImage: props.deleteImage,
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
          props.deleteImage()
        }}
      />
      <div className='z-30 bg-white w-4/5 lg:w-3/5 h-3/4 m-auto shadow-xl px-6'>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => { void props.productModalSubmitHandler(event, props.selectedAction) }}
          className='flex flex-col gap-y-3 h-full overflow-y-auto py-6'
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
              <input
                type='file'
                id='selectedImage'
                className='hidden'
                accept='image/*'
                onChange={(event) => { props.onImageChange(event) }}
              />
              <div className='flex gap-x-2'>
                <button
                  type='button'
                  onClick={() => { document?.getElementById('selectedImage')?.click() }}
                  className='w-1/2 bg-blue-500 text-white text-sm p-1 cursor-pointer'
                >
                  Cari Gambar
                </button>
                {
                  props.imageUrl !== '' &&
                <button
                  type='button'
                  value='Cari Gambar'
                  onClick={() => { props.deleteImage() }}
                  className='w-1/2 bg-red-500 text-white text-sm p-1 cursor-pointer'>
                  Hapus Gambar
                </button>
                }
              </div>
            </div>
            <div className='w-full flex flex-col gap-y-2 justify-center items-center bg-gray-100'>
              {
                props.imageUrl !== '' && <>
                  <Image
                    src={props.imageUrl}
                    className='w-full h-fit object-contain'
                    alt='preview'
                    width={24}
                    height={24} />
                </>
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
