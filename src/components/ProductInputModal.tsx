import { type ReactElement } from 'react'

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
      return <div className='flex gap-x-4 justify-end mt-4'>
        <button type='button' onClick={() => { props.setIsProductModalShowed(false) }}>Batal</button>
        <button type='submit' className='rounded-lg bg-green-600 py-2 px-6 text-white'>Tambah</button>
      </div>
    case 'edit':
      return <div className='flex gap-x-4 justify-end mt-4'>
        <button type='button' onClick={() => { props.setIsProductModalShowed(false) }}>Batal</button>
        <button type='submit' disabled={!props.isThereAnyChange} className='rounded-lg bg-amber-500 py-2 px-6 text-white'>Ubah</button>
      </div>
    case 'delete':
      return <div className='flex gap-x-4 justify-end mt-4'>
        <button type='button' onClick={() => { props.setIsProductModalShowed(false) }}>Batal</button>
        <button type='submit' className='rounded-lg bg-red-600 py-2 px-6 text-white'>Hapus</button>
      </div>
    default:
      return <div className='flex gap-x-4 justify-end mt-4'>
        <button type='button' onClick={() => { props.setIsProductModalShowed(false) }} className='rounded-lg bg-sky-600 py-2 px-6 text-white'>Tutup</button>
      </div>
    }
  }

  return (
    <div className='w-full h-full relative top-0 left-0 flex'>
      <div
        className='absolute z-20 bg-slate-300 opacity-70 w-screen h-screen top-0 left-0'
        onClick={() => { props.setIsProductModalShowed(false) }}
      />
      <div className='z-30 bg-white w-4/5 lg:w-3/5 m-auto h-fit shadow-xl p-6'>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => { void props.productModalSubmitHandler(event, props.selectedAction) }}
          className='flex flex-col gap-y-3'
        >
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='name'>Nama</label>
            <input
              id='name'
              type='text'
              value={props.name}
              className='border border-slate-200 hover:border-amber-600 w-full p-2'
              onChange={(event) => { props.setName(event.target.value) }}
              placeholder='Pensil 2B'
              disabled={props.selectedAction === 'detail' || props.selectedAction === 'delete'}
              required
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='capitalPrice'>Modal</label>
            <input
              id='capitalPrice'
              type='number'
              value={props.capitalPrice}
              className='border border-slate-200 hover:border-amber-600 w-full p-2'
              onChange={(event) => { props.setCapitalPrice(parseInt(event.target.value)) }}
              placeholder='10000'
              disabled={props.selectedAction === 'detail' || props.selectedAction === 'delete'}
              required/>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='sellPrice'>Harga Jual</label>
            <input
              id='sellPrice'
              type='number'
              value={props.sellPrice}
              className='border border-slate-200 hover:border-amber-600 w-full p-2'
              onChange={(event) => { props.setSellPrice(parseInt(event.target.value)) }}
              placeholder='20000'
              disabled={props.selectedAction === 'detail' || props.selectedAction === 'delete'}
              required/>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='stock'>Stok</label>
            <input
              id='stock'
              type='number'
              value={props.stock}
              className='border border-slate-200 hover:border-amber-600 w-full p-2'
              onChange={(event) => { props.setStock(parseInt(event.target.value)) }}
              placeholder='10'
              disabled={props.selectedAction === 'detail' || props.selectedAction === 'delete'}
              required/>
          </div>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='unit'>Satuan</label>
            <input
              id='unit'
              type='text'
              value={props.unit}
              className='border border-slate-200 hover:border-amber-600 w-full p-2'
              onChange={(event) => { props.setUnit(event.target.value) }}
              placeholder='Pcs'
              disabled={props.selectedAction === 'detail' || props.selectedAction === 'delete'}
              required/>
          </div>
          { renderButtons(props.selectedAction) }
        </form>
      </div>
    </div>
  )
}

export default ProductInputModal
