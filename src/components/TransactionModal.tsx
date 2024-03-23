import type { ReactElement } from 'react'
import formatPrice from '@/utils/formatPrice'
import formatDate from '@/utils/formatDate'
import type ITransaction from '@/types/transaction'

interface ITransactionModal {
  selectedTransaction: ITransaction | null
  closeTransactionModal: () => void
}

interface IProps {
  props: ITransactionModal
}

const TransactionModal = ({ props }: IProps): ReactElement => {
  return <div className='w-full h-full relative top-0 left-0 flex whitespace-nowrap'>
    <div
      className='absolute z-20 bg-slate-300 opacity-70 w-screen h-screen top-0 left-0 cursor-pointer'
      onClick={() => {
        props.closeTransactionModal()
      }}
    />
    <div className='z-30 bg-white w-4/5 lg:w-3/5 h-3/4 m-auto shadow-xl'>
      {
        props.selectedTransaction !== null && <div className='flex flex-col gap-y-3 h-full overflow-y-auto py-4 px-5'>
          <h1 className='font-semibold text-xl'>Detail Belanja</h1>
          <div>
            <p>{formatDate(props.selectedTransaction.createdAt)}</p>
            <p>{props.selectedTransaction.owner.username} sebagai {props.selectedTransaction.owner.role}</p>
            <p>{props.selectedTransaction.isUnpaid ? 'Sudah' : 'Belum'} Lunas</p>
          </div>
          <div className='flex flex-col gap-y-3'>
            <h2 className='font-medium text-lg'>Keranjang</h2>
            <div className='oveflow-x-auto w-full pb-2'>
              <table className='min-w-full text-center border-collapse whitespace-nowrap'>
                <tbody>
                  <tr className='text-left'>
                    <th className='pr-3'>Nama Barang</th>
                    <th className='text-center pr-3'>Qty</th>
                    <th className='pr-3'>Harga</th>
                    <th className='pr-3'>Total</th>
                  </tr>
                  {
                    props.selectedTransaction.carts?.map((item, index) =>
                      <tr key={index} className='text-left'>
                        <td className='pr-3'>{item.product.name}</td>
                        <td className='text-center pr-3'>{item.total}</td>
                        <td className='pr-3'>
                          <p className='flex justify-between'>
                            <span>Rp. </span>
                            <span>{formatPrice(`${item.product.sellPrice}`)}</span>
                          </p>
                        </td>
                        <td className='pr-3'>
                          <p className='flex justify-between'>
                            <span>Rp. </span>
                            <span>{formatPrice(`${item.product.sellPrice * item.total}`)}</span>
                          </p>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='mt-auto font-bold w-full'>
            <table className='min-w-full text-center border-collapse'>
              <tbody>
                <tr>
                  <th className='text-left'>Total Belanja</th>
                  <th>
                    <p className='text-right'>
                      <span>Rp. </span>
                      <span>{formatPrice(`${props.selectedTransaction.total}`)}</span>
                    </p>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  </div>
}

export default TransactionModal
