import { type ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { HiShoppingCart } from 'react-icons/hi2'
import dayjs, { type Dayjs } from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import DefaultLayout from '@/layouts/default'
import TransactionModal from '@/components/TransactionModal'
import formatPrice from '@/utils/formatPrice'
import formatDate from '@/utils/formatDate'
import { type RootState } from '@/store'
import { asyncGetTransactions, asyncGetTransactionDetail } from '@/store/transactions/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import { type IStateUser } from '@/store/user/action'
import type ITransaction from '@/types/transaction'

const Transaction = (): ReactElement => {
  const dispatch = useDispatch()

  const user: IStateUser | null = useSelector((state: RootState) => state.user)
  const transactions: ITransaction[] | never[] = useSelector((state: RootState) => state.transactions)

  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null)
  const [isTransactionModalShowed, setIsTransactionModalShowed] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())

  useEffect(() => {
    void fetchTransactionPerDate()
  }, [user, selectedDate])

  const fetchTransactionPerDate = async (): Promise<void> => {
    if (user !== null && selectedDate !== null) {
      dispatch(setLoadingTrueActionCreator())
      await dispatch(asyncGetTransactions(selectedDate))
      dispatch(setLoadingFalseActionCreator())
    }
  }

  const getTransactionDetailAndShowModal = async (index: number): Promise<void> => {
    dispatch(setLoadingTrueActionCreator())
    const transaction = transactions.find((item) => item.id === index)

    if (transaction !== undefined) {
      if (transaction.carts !== undefined) {
        setSelectedTransaction(transaction)
      } else {
        const newDetailTransaction: ITransaction | null = await dispatch(asyncGetTransactionDetail(index))

        if (newDetailTransaction !== null) {
          setSelectedTransaction(newDetailTransaction)
        }
      }
    }

    setIsTransactionModalShowed(true)
    dispatch(setLoadingFalseActionCreator())
  }

  const closeTransactionModal = (): void => {
    setSelectedTransaction(null)
    setIsTransactionModalShowed(false)
  }

  return (
    <>
      <Head>
        <title>Transaction | Inventory App</title>
        <meta
          name='description'
          content='Transaction Inventory App'
        />
      </Head>
      <div className='flex flex-col py-4 px-6 md:py-6 md:px-12'>
        <div className='container mx-auto flex flex-col items-center gap-y-4 overflow-x-auto'>
          <div className='w-full flex items-center justify-end py-3'>
            <DatePicker
              label='Tanggal Transaksi'
              value={selectedDate}
              onChange={(newValue) => { setSelectedDate(newValue) }}
            />
          </div>
          <div className='w-full flex items-start justify-start gap-3 flex-wrap whitespace-nowrap'>
            <table className='min-w-full text-center whitespace-nowrap border-collapse'>
              <tbody>
                <tr className='bg-gray-600 text-white'>
                  <th className='px-3 py-2 border'>No</th>
                  <th className='px-3 py-2 border'>Oleh</th>
                  <th className='px-3 py-2 border'>Waktu Transaksi</th>
                  <th className='px-3 py-2 border'>Status</th>
                  <th className='px-3 py-2 border'>Jumlah</th>
                  <th className='px-3 py-2 border'>Detail</th>
                </tr>
                {
                  transactions.map((transaction, index) =>
                    <tr
                      key={index}
                      className='odd:bg-gray-100'
                    >
                      <td className='px-3 py-2 border'>{index + 1}</td>
                      <td className='px-3 py-2 border'>
                        <div className='flex justify-between gap-x-4'>
                          <span>{transaction.owner.username}</span>
                          <span className={`${transaction.owner.role === 'admin' ? 'bg-blue-500' : 'bg-emerald-500'} text-white py-1 px-4 text-xs rounded-md`}>
                            {transaction.owner.role === 'admin' ? 'Admin' : 'Pengguna'}
                          </span>
                        </div>
                      </td>
                      <td className='px-3 py-2 border'>{formatDate(transaction.createdAt)}</td>
                      <td className='px-3 py-2 border'>
                        <span className={`${transaction.isUnpaid ? 'bg-emerald-500' : 'bg-red-500'} text-white py-1 px-4 text-xs rounded-md`}>{transaction.isUnpaid ? 'Lunas' : 'Belum Lunas'}</span>
                      </td>
                      <td className='px-3 py-2 border'>
                        <div className='flex justify-between gap-x-4'>
                          <span>Rp. </span>
                          <span>{formatPrice(`${transaction.total}`)}</span>
                        </div>
                      </td>
                      <td className='px-3 py-2 border'>
                        <button
                          className='flex m-auto w-7 h-7 rounded-md bg-sky-600'
                          onClick={() => { void getTransactionDetailAndShowModal(transaction.id) }}
                        >
                          <HiShoppingCart className='m-auto text-white'/>
                        </button>
                      </td>
                    </tr>
                  )
                }
                {
                  transactions.length <= 0 && <tr className='odd:bg-gray-100'>
                    <td className='px-3 py-2 border' colSpan={6}>Tidak ada transaksi pada tanggal ini</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={`${isTransactionModalShowed ? 'fixed z-20' : 'hidden'} w-screen h-screen top-0 left-0`}>
        <TransactionModal props={{
          selectedTransaction,
          closeTransactionModal
        }} />
      </div>
    </>
  )
}

Transaction.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Transaction
