/* eslint-disable no-useless-escape */

import { type ReactElement } from 'react'

interface IProductInputModal {
  index: number
  isDynamic: boolean
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
  handleFieldChange: (index: number, attr: string, value: string) => void
}

interface IProps {
  props: IProductInputModal
}

const ProductInput = ({ props }: IProps): ReactElement => {
  return (
    <>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='name'>Nama</label>
        <input
          id='name'
          type='text'
          value={props.name}
          className='border border-slate-200 hover:border-amber-600 w-full p-2'
          onChange={props.isDynamic
            ? (event) => { props.handleFieldChange(props.index, 'name', event.target.value.replace(/[^\w\s\']|_/g, '')) }
            : (event) => { props.setName(event.target.value.replace(/[^\w\s\']|_/g, '')) }}
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
          onChange={props.isDynamic
            ? (event) => { props.handleFieldChange(props.index, 'capitalPrice', event.target.value.replace(/\D/g, '')) }
            : (event) => { props.setCapitalPrice(parseInt(event.target.value.replace(/\D/g, ''))) }}
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
          onChange={props.isDynamic
            ? (event) => { props.handleFieldChange(props.index, 'sellPrice', event.target.value.replace(/\D/g, '')) }
            : (event) => { props.setSellPrice(parseInt(event.target.value.replace(/\D/g, ''))) }}
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
          onChange={props.isDynamic
            ? (event) => { props.handleFieldChange(props.index, 'stock', event.target.value.replace(/\D/g, '')) }
            : (event) => { props.setStock(parseInt(event.target.value.replace(/\D/g, ''))) }}
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
          onChange={props.isDynamic
            ? (event) => { props.handleFieldChange(props.index, 'unit', event.target.value.replace(/[^\w\s\']|_/g, '')) }
            : (event) => { props.setUnit(event.target.value.replace(/[^\w\s\']|_/g, '')) }}
          placeholder='Pcs'
          disabled={props.selectedAction === 'detail' || props.selectedAction === 'delete'}
          required/>
      </div>
    </>
  )
}

export default ProductInput
