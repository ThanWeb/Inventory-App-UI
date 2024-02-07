import { useState, useEffect } from 'react'
import type { ReactElement, ChangeEvent } from 'react'
import { HiOutlineListBullet, HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi2'
import translateProductProps from '@/utils/translateProductProps'
import type IProduct from '@/types/product'

interface IPaginationTable {
  searchQuery: string
  showProductModalForAction: (action: string, product: IProduct | null, id: number) => void
  sortOption: string[]
  sortBy: string
  changeSortBy: (param: string) => void
}

interface IProps {
  rawItems: IProduct[] | never[]
  props: IPaginationTable
}

const PaginationTable = ({ rawItems, props }: IProps): ReactElement => {
  const itemsShowedOption = [5, 15, 25, 50, 100]
  const [splitedItems, setSplitedItems] = useState<IProduct[][]>([[]])
  const [paginationItem, setPaginationItem] = useState(itemsShowedOption[0])
  const [activePagination, setActivePagination] = useState(0)
  const [propsItem, setPropsItem] = useState<string[]>([])

  useEffect(() => {
    fetchDataFromLocalStorage()
  }, [])

  useEffect(() => {
    splitItemsIntoPaginationAndGetItemNames()
  }, [rawItems])

  useEffect(() => {
    paginationItemChangeHandler()
  }, [paginationItem])

  const fetchDataFromLocalStorage = (): void => {
    const localPaginationItem = localStorage.getItem('paginationItem')

    if (localPaginationItem !== null) {
      setPaginationItem(parseInt(localPaginationItem))
    }
  }

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
          return item !== 'id' && item !== 'isDeleted' && item !== 'createdBy' && item !== 'lastUpdatedBy'
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

  const changePaginationItem = (value: string): void => {
    setPaginationItem(parseInt(value))
    localStorage.setItem('paginationItem', value)
  }

  return (
    <div className='w-full'>
      { rawItems.length <= 0
        ? <p>Tidak ada data yang bisa ditampilkan{ props.searchQuery !== '' ? ', silahkan ubah kata kunci.' : '.'}</p>
        : <div className='flex flex-col gap-y-3'>
          <div className='flex flex-col md:flex-row gap-y-3 md:gap-x-4 justify-end'>
            <div className='flex justify-end gap-x-2 border py-1 px-2 rounded'>
              <label className='font-semibold mr-auto md:m-0'>Urutkan</label>
              <select
                value={props.sortBy}
                name='sort'
                id='sort'
                onChange={(e: ChangeEvent<HTMLSelectElement>) => { props.changeSortBy(e.target.value) }}
                className='pr-2 text-right md:text-left'
              >
                {
                  props.sortOption.map((option) =>
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                }
              </select>
            </div>
            <div className='flex justify-end gap-x-2 border py-1 px-2 rounded'>
              <label className='font-semibold mr-auto md:m-0'>Baris per tabel</label>
              <select
                value={paginationItem}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => { changePaginationItem(e.target.value) }}
                required
                className='pr-2 text-right md:text-left'
              >
                {
                  itemsShowedOption.map((item, index) =>
                    <option
                      key={index}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                }
              </select>
            </div>
          </div>
          <div className='w-full overflow-x-auto'>
            {
              splitedItems.map((items: IProduct[], parentIndex: number) =>
                <table
                  key={parentIndex}
                  className={`${parentIndex !== activePagination ? 'hidden' : ''} text-center min-w-full whitespace-nowrap`}>
                  <tbody>
                    <tr>
                      <th className='px-3 py-2 border'>No</th>
                      {propsItem.map((header, index) =>
                        <th
                          key={index}
                          className='px-3 py-2 border'
                        >
                          {translateProductProps(header)}
                        </th>)}
                      <th className='px-3 py-2 border'>Aksi</th>
                    </tr>
                    {
                      items.map((item: IProduct, childIndex: number) =>
                        <tr
                          key={childIndex}
                          className='odd:bg-gray-100'
                        >
                          <td className='px-3 py-2 border'>
                            <span>{(paginationItem * parentIndex) + (childIndex + 1)}</span>
                          </td>
                          {
                            propsItem.map((prop, index) => {
                              if (prop === 'createdAt' || prop === 'updatedAt') {
                                return (
                                  <td
                                    key={index}
                                    className='px-3 py-2 border'
                                  >
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
                                return <td
                                  key={index}
                                  className='px-3 py-2 border capitalize'
                                >
                                  <span>{item[prop]}</span>
                                </td>
                              }

                              return <td
                                key={index}
                                className='px-3 py-2 border'
                              >
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
                                className='w-7 h-7 flex bg-amber-500'
                              >
                                <HiOutlinePencil className='m-auto text-white' />
                              </button>
                              <button
                                type='button'
                                onClick={() => { props.showProductModalForAction('delete', item, item.id ?? 0) }}
                                className='w-7 h-7 flex bg-red-600'
                              >
                                <HiOutlineTrash className='m-auto text-white' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    }
                    <tr>
                      <th className='px-3 py-2 border'>No</th>
                      {propsItem.map((header, index) => <th
                        key={index}
                        className='px-3 py-2 border'
                      >
                        {translateProductProps(header)}
                      </th>)}
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
            {/* Prev Button -2 */}
            {
              activePagination - 2 >= 0 && <button
                type='button'
                className='w-8 h-8 bg-white text-black border-solid border-2 shadow'
                onClick={() => { changePagination(2 * -1) }}
              >
                ..
              </button>
            }

            {/* Prev Button -1 */}
            {
              activePagination !== 0 && <button
                type='button'
                className='w-8 h-8 bg-white text-black border-solid border-2 shadow'
                onClick={() => { changePagination(-1) }}
              >
                {activePagination}
              </button>
            }

            {/* Active Pagination */}
            <button
              type='button'
              className='w-8 h-8 bg-sky-700 text-white border-solid border-2'
            >
              {activePagination + 1}
            </button>

            {/* Next Button +1 */}
            {
              activePagination !== splitedItems.length - 1 && <button
                type='button'
                className='w-8 h-8 bg-white text-black border-solid border-2 shadow'
                onClick={() => { changePagination(1) }}
              >
                {activePagination + 2}
              </button>
            }

            {/* Next Button +2 */}
            {
              activePagination + 2 < splitedItems.length && <button
                type='button'
                className='w-8 h-8 bg-white text-black border-solid border-2 shadow'
                onClick={() => { changePagination(2) }}
              >
              ..
              </button>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default PaginationTable
