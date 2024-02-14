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
      className='absolute z-20 bg-slate-300 opacity-70 w-screen h-screen top-0 left-0'
      onClick={() => {
        props.closeTransactionModal()
      }}
    />
    <div className='z-30 bg-white w-4/5 lg:w-3/5 h-3/4 m-auto shadow-xl px-4'>
      {
        props.selectedTransaction !== null && <div className='flex flex-col gap-y-3 h-full overflow-y-auto py-4 px-1'>
          <h1 className='font-semibold text-xl'>Detail Belanja</h1>
          <div>
            <p>{formatDate(props.selectedTransaction.createdAt)}</p>
            <p>{props.selectedTransaction.owner.username} sebagai {props.selectedTransaction.owner.role}</p>
            <p>{props.selectedTransaction.isUnpaid ? 'Sudah' : 'Belum'} Lunas</p>
          </div>
          <div className='border'/>
          <div className='flex flex-col gap-y-2'>
            <h2 className='font-medium text-lg'>Keranjang</h2>
            <div className='oveflow-x-auto'>
              <table className='min-w-full text-center border-collapse whitespace-nowrap'>
                <tbody>
                  <tr>
                    <th className='text-left'>Nama Barang</th>
                    <th>Qty</th>
                    <th className='text-left'>Harga</th>
                  </tr>
                  {
                    props.selectedTransaction.carts?.map((item, index) =>
                      <tr key={index}>
                        <td className='text-left'>{item.product.name}</td>
                        <td>{item.total}</td>
                        <td className='flex justify-between'>
                          <span>Rp. </span>
                          <span>{formatPrice(`${item.product.sellPrice}`)}</span>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='border'/>
          <div className='mt-auto font-bold'>
            <table className='min-w-full text-center border-collapse'>
              <tbody>
                <tr>
                  <th className='text-left'>Total Belanja</th>
                  <th className='flex justify-between'>
                    <span>Rp. </span>
                    <span>{formatPrice(`${props.selectedTransaction.total}`)}</span>
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
