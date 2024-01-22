import { useState, useEffect } from 'react'
import type { ReactElement, ChangeEvent } from 'react'
import { HiOutlineListBullet, HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi2'
import translateProductProps from '@/utils/translateProductProps'
import type IProduct from '@/types/product'

interface IPaginationTable {
  searchQuery: string
  showProductModalForAction: (action: string, product: IProduct | null, id: number) => void
}

interface IProps {
  rawItems: IProduct[] | never[]
  props: IPaginationTable
}

const PaginationTable = ({ rawItems, props }: IProps): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemsShowedOption, setItemsShowedOption] = useState([1, 5, 15, 25, 50, 100])
  const [splitedItems, setSplitedItems] = useState<IProduct[][]>([[]])
  const [paginationItem, setPaginationItem] = useState(itemsShowedOption[0])
  const [activePagination, setActivePagination] = useState(0)
  const [propsItem, setPropsItem] = useState<string[]>([])

  useEffect(() => {
    splitItemsIntoPaginationAndGetItemNames()
  }, [rawItems])

  useEffect(() => {
    paginationItemChangeHandler()
  }, [paginationItem])

  const splitItemsIntoPaginationAndGetItemNames = (): void => {
    if (rawItems.length > 0) {
      let tempArray = []
      const tempRawItems = rawItems.map((item) => item)
      const tempSplitedItems = []

      if (tempRawItems.length > 0) {
        while (tempRawItems.length > 0) {
          tempArray = tempRawItems.splice(0, paginationItem)
          tempSplitedItems.push(tempArray)
        }

        setSplitedItems(tempSplitedItems)
        setPropsItem(Object.getOwnPropertyNames(tempSplitedItems[0][0]).filter((item) => {
          return item !== 'id' && item !== 'isDeleted' && item !== 'userId'
        }))
      }
    }
  }

  const paginationItemChangeHandler = (): void => {
    setActivePagination(0)
    splitItemsIntoPaginationAndGetItemNames()
  }

  const changePagination = (page: number): void => {
    let result = activePagination + page
    if (result > splitedItems.length - 1) { result = splitedItems.length - 1 }
    setActivePagination(result)
  }

  const changePaginationItem = (event: ChangeEvent<HTMLSelectElement>): void => {
    setPaginationItem(parseInt(event.target.value))
  }

  return (
    <div className='w-full'>
      { rawItems.length <= 0
        ? <p>Tidak ada data yang bisa ditampilkan{ props.searchQuery !== '' ? ', silahkan ubah kata kunci.' : '.'}</p>
        : <div className='flex flex-col gap-y-3'>
          <div>
            <div className='flex justify-end gap-x-2'>
              <label className='font-semibold'>Baris per tabel</label>
              <select value={paginationItem} onChange={(e) => { changePaginationItem(e) }} required>
                {
                  itemsShowedOption.map((item, index) =>
                    <option key={index} value={item}>{item}</option>
                  )
                }
              </select>
            </div>
          </div>
          <div className='w-full overflow-x-auto'>
            {
              splitedItems.map((items: IProduct[], parentIndex: number) =>
                <table key={parentIndex} className={`${parentIndex !== activePagination ? 'hidden' : ''} text-center min-w-full`}>
                  <tbody>
                    <tr>
                      <th className='px-3 py-2 border'>No</th>
                      {propsItem.map((header, index) => <th key={index} className='px-3 py-2 border whitespace-nowrap'>{translateProductProps(header)}</th>)}
                      <th className='px-3 py-2 border'>Aksi</th>
                    </tr>
                    {
                      items.map((item: IProduct, childIndex: number) =>
                        <tr key={childIndex}>
                          <td className='px-3 py-2 border'>
                            <span>{(paginationItem * parentIndex) + (childIndex + 1)}</span>
                          </td>
                          {
                            propsItem.map((prop, index) => {
                              if (prop === 'createdAt' || prop === 'updatedAt') {
                                return (
                                  <td key={index} className='px-3 py-2 border whitespace-nowrap'>
                                    <span>{new Date(`${item[prop]}`).toLocaleString()}</span>
                                  </td>
                                )
                              } else if (
                                prop === 'name' ||
                                prop === 'capitalPrice' ||
                                prop === 'sellPrice' ||
                                prop === 'stock' ||
                                prop === 'unit'
                              ) {
                                return <td key={index} className='px-3 py-2 border capitalize'>
                                  <span>{item[prop]}</span>
                                </td>
                              }

                              return <td key={index} className='px-3 py-2 border'>
                                <span></span>
                              </td>
                            }

                            )
                          }
                          <td className='px-3 py-2 border'>
                            <div className='flex gap-x-2 justify-center'>
                              <button
                                type='button'
                                onClick={() => { props.showProductModalForAction('detail', item, 0) }}
                                className='w-7 h-7 flex bg-sky-600'
                              >
                                <HiOutlineListBullet className='m-auto text-white' />
                              </button>
                              <button
                                type='button'
                                onClick={() => { props.showProductModalForAction('edit', item, item.id ?? 0) }}
                                className='w-7 h-7 flex bg-red-600'
                              >
                                <HiOutlineTrash className='m-auto text-white' />
                              </button>
                              <button
                                type='button'
                                onClick={() => { props.showProductModalForAction('delete', item, item.id ?? 0) }}
                                className='w-7 h-7 flex bg-amber-600'
                              >
                                <HiOutlinePencil className='m-auto text-white' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    }
                    <tr>
                      <th className='px-3 py-2 border'>No</th>
                      {propsItem.map((header, index) => <th key={index} className='px-3 py-2 border whitespace-nowrap'>{translateProductProps(header)}</th>)}
                      <th className='px-3 py-2 border'>Aksi</th>
                    </tr>
                  </tbody>
                </table>
              )
            }
          </div>
          <div className='flex flex-col gap-y-3'>
            <span className='ml-auto'>Total {rawItems.length} item</span>
            <span className='mx-auto'>Menampilkan {activePagination + 1} dari {splitedItems.length} halaman</span>
          </div>
          <div className='flex justify-center gap-x-2'>
            {activePagination - 2 >= 0 && <button type='button' className='w-8 h-8 bg-sky-700 text-white' onClick={() => { changePagination(2 * -1) }}>..</button>}
            {activePagination !== 0 && <button type='button' className='w-8 h-8 bg-sky-700 text-white' onClick={() => { changePagination(-1) }}>{activePagination}</button>}
            <button type='button' className='w-8 h-8 bg-amber-700 text-white'>{activePagination + 1}</button>
            {activePagination !== splitedItems.length - 1 && <button type='button' className='w-8 h-8 bg-sky-700 text-white' onClick={() => { changePagination(1) }}>{activePagination + 2}</button>}
            {activePagination + 2 < splitedItems.length && <button type='button' className='w-8 h-8 bg-sky-700 text-white' onClick={() => { changePagination(2) }}>..</button>}
          </div>
        </div>
      }
    </div>
  )
}

export default PaginationTable
