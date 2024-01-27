/* eslint-disable no-useless-escape */

import { useState, type ReactElement } from 'react'
import type IProduct from '@/types/product'

interface ICartInput {
  index: number
  name: string
  total: number
  products: IProduct[] | never[]
  handleFieldChange: (index: number, attr: string, value: string) => void
}

interface IProps {
  props: ICartInput
}

const CartInput = ({ props }: IProps): ReactElement => {
  const [isSearch, setIsSearch] = useState(false)

  const findMax = (products: IProduct[], name: string): number => {
    if (products.length > 0 && name !== '') {
      const result = products.filter(product => product.name === name)

      if (result.length > 0) {
        return result[0].stock
      }
    }

    return 0
  }

  const isTotalDisabled = (products: IProduct[], name: string): boolean => {
    if (products.length > 0 && name !== '') {
      const result = products.filter(product => product.name === name)

      if (result.length > 0) {
        return result[0].stock <= 0
      }
    }

    return false
  }

  return (
    <>
      <div className='flex flex-col gap-y-2 relative'>
        <label htmlFor='name'>Nama</label>
        <input
          id='name'
          type='text'
          value={props.name}
          className='border border-slate-200 hover:border-amber-600 w-full p-2'
          onChange={(event) => {
            props.handleFieldChange(props.index, 'name', event.target.value.replace(/[^\w\s\']|_/g, ''))
            setIsSearch(true)
          }}
          placeholder='Pensil 2B'
          autoComplete='off'
          required
        >
        </input>
        <div className={`${!isSearch || props.name === '' ? 'hidden' : 'block'} absolute max-h-32 top-20 left-0 overflow-y-auto bg-white z-10 w-full shadow-lg`}>
          <ul className='m-2'>
            {
              props.products.length <= 0
                ? <li className='border border-slate-200 hover:border-amber-600 w-full p-2'>Tidak Ditemukan</li>
                : props.products.map((product) =>
                  <li
                    key={product.name}
                    value={product.name}
                    className='border border-slate-200 hover:border-amber-600 w-full p-2 flex justify-between items-center'
                    onClick={() => {
                      props.handleFieldChange(props.index, 'name', product.name.replace(/[^\w\s\']|_/g, ''))
                      setIsSearch(false)
                    }}
                  >
                    <span>{product.name}</span>
                    {
                      product.stock <= 0 && <span className='text-red-500 text-sm'>kosong</span>
                    }
                  </li>
                )
            }
          </ul>
        </div>
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='total'>Total</label>
        <input
          id='total'
          type='number'
          value={props.total}
          className='border border-slate-200 hover:border-amber-600 w-full p-2'
          onChange={(event) => { props.handleFieldChange(props.index, 'total', event.target.value.replace(/\D/g, '')) }}
          placeholder='10'
          disabled={isTotalDisabled(props.products, props.name)}
          min={0}
          max={findMax(props.products, props.name)}
          required/>
      </div>
    </>
  )
}

export default CartInput
