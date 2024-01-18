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
      return <div>
        <button type='submit'>Tambah</button>
        <button type='button' onClick={() => { props.setIsProductModalShowed(false) }}>Batal</button>
      </div>
    case 'edit':
      return <div>
        <button type='submit' disabled={!props.isThereAnyChange}>Ubah</button>
        <button type='button' onClick={() => { props.setIsProductModalShowed(false) }}>Batal</button>
      </div>
    case 'delete':
      return <div>
        <button type='submit'>Hapus</button>
        <button type='button' onClick={() => { props.setIsProductModalShowed(false) }}>Batal</button>
      </div>
    default:
      return <div>
        <button type='button' onClick={() => { props.setIsProductModalShowed(false) }}>Tutup</button>
      </div>
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => { void props.productModalSubmitHandler(event, props.selectedAction) }}>
          <div>
            <label htmlFor='name'>Nama</label>
            <input
              id='name'
              type='text'
              value={props.name}
              onChange={(event) => { props.setName(event.target.value) }}
              placeholder='Pensil 2B'
              disabled={props.selectedAction === 'detail' || props.selectedAction === 'delete'}
              required
            />
          </div>
          <div>
            <label htmlFor='capitalPrice'>Modal</label>
            <input
              id='capitalPrice'
              type='number'
              value={props.capitalPrice}
              onChange={(event) => { props.setCapitalPrice(parseInt(event.target.value)) }}
              placeholder='10000'
              disabled={props.selectedAction === 'detail' || props.selectedAction === 'delete'}
              required/>
          </div>
          <div>
            <label htmlFor='sellPrice'>Harga Jual</label>
            <input
              id='sellPrice'
              type='number'
              value={props.sellPrice}
              onChange={(event) => { props.setSellPrice(parseInt(event.target.value)) }}
              placeholder='20000'
              disabled={props.selectedAction === 'detail' || props.selectedAction === 'delete'}
              required/>
          </div>
          <div>
            <label htmlFor='stock'>Stok</label>
            <input
              id='stock'
              type='number'
              value={props.stock}
              onChange={(event) => { props.setStock(parseInt(event.target.value)) }}
              placeholder='10'
              disabled={props.selectedAction === 'detail' || props.selectedAction === 'delete'}
              required/>
          </div>
          <div>
            <label htmlFor='unit'>Satuan</label>
            <input
              id='unit'
              type='text'
              value={props.unit}
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
