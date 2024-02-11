import { useState, type ReactElement, useEffect } from 'react'
import Head from 'next/head'
import DefaultLayout from '@/layouts/default'
import api from '@/utils/api'
import formatPrice from '@/utils/formatPrice'
import formatDate from '@/utils/formatDate'
import type ITransaction from '@/types/transaction'

const Transaction = (): ReactElement => {
  const [transactions, setTransaction] = useState<ITransaction[]>([])

  useEffect(() => {
    void fetchTransactions()
  }, [])

  const fetchTransactions = async (): Promise<void> => {
    const response: { error: boolean, message: string, transactions: ITransaction[] } = await api.getAllTransctions()

    if (!response.error && response.transactions.length > 0) {
      setTransaction(response.transactions)
    }
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
        <div className='container mx-auto flex flex-col items-center gap-y-3'>
          <table className='min-w-full text-center whitespace-nowrap'>
            <tbody>
              <tr>
                <th className='px-3 py-2 border'>No</th>
                <th className='px-3 py-2 border'>Oleh</th>
                <th className='px-3 py-2 border'>Waktu Transaksi</th>
                <th className='px-3 py-2 border'>Status</th>
                <th className='px-3 py-2 border'>Jumlah</th>
                <th className='px-3 py-2 border'>Aksi</th>
              </tr>
              {
                transactions.map((transaction, index) =>
                  <tr key={index}>
                    <td className='px-3 py-2 border'>{index + 1}</td>
                    <td className='px-3 py-2 border flex justify-between gap-x-4'>
                      <span>{transaction.owner.username}</span>
                      <span className={`${transaction.owner.role === 'admin' ? 'bg-blue-500' : 'bg-emerald-500'} text-white py-1 px-4 text-xs rounded-md`}>
                        {transaction.owner.role === 'admin' ? 'Admin' : 'Pengguna'}
                      </span>
                    </td>
                    <td className='px-3 py-2 border'>{formatDate(transaction.createdAt)}</td>
                    <td className='px-3 py-2 border'>
                      <span className={`${transaction.isUnpaid ? 'bg-emerald-500' : 'bg-red-500'} text-white py-1 px-4 text-xs rounded-md`}>{transaction.isUnpaid ? 'Lunas' : 'Belum Lunas'}</span>
                    </td>
                    <td className='px-3 py-2 border flex justify-between gap-x-4'>
                      <span>Rp. </span>
                      <span>{formatPrice(`${transaction.total}`)}</span>
                    </td>
                    <td className='px-3 py-2 border'>
                      <button>Detail</button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
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
