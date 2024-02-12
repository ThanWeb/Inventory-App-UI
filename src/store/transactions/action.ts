import { type Dispatch } from '@reduxjs/toolkit'
import api from '@/utils/api'
import type ITransaction from '@/types/transaction'

const ActionType = {
  RECEIVE_TRANSACTIONS: 'RECEIVE_TRANSACTIONS',
  GET_TRANSACTION_DETAIL: 'GET_TRANSACTION_DETAIL'
}

const receiveTransactionsActionCreator = (transactions: ITransaction[] | never[]): { type: string, payload: Record<string, any> } => {
  return {
    type: ActionType.RECEIVE_TRANSACTIONS,
    payload: {
      transactions
    }
  }
}

const receiveTransactionDetailActionCreator = (id: number, transaction: ITransaction): { type: string, payload: Record<string, any> } => {
  return {
    type: ActionType.GET_TRANSACTION_DETAIL,
    payload: {
      id,
      transaction
    }
  }
}

const asyncGetTransactions = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      const { transactions }: { transactions: ITransaction[] | never[] } = await api.getAllTransactions()
      dispatch(receiveTransactionsActionCreator(transactions))
    } catch (error: any) {
      console.error(error.message)
    }
  }
}

const asyncGetTransactionDetail = (id: number): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response: { transaction: ITransaction } = await api.getTransactionDetail(id)

      if (response.transaction.carts !== undefined) {
        dispatch(receiveTransactionDetailActionCreator(id, response.transaction))
        return response.transaction
      }

      return null
    } catch (error: any) {
      console.error(error.message)
    }
  }
}

export {
  ActionType,
  asyncGetTransactions,
  asyncGetTransactionDetail
}
