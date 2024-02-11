import { type Dispatch } from '@reduxjs/toolkit'
import api from '@/utils/api'
import type ITransaction from '@/types/transaction'

const ActionType = {
  RECEIVE_TRANSACTIONS: 'RECEIVE_TRANSACTIONS'
}

const receiveTransactionsActionCreator = (transactions: ITransaction[] | never[]): { type: string, payload: Record<string, any> } => {
  return {
    type: ActionType.RECEIVE_TRANSACTIONS,
    payload: {
      transactions
    }
  }
}

const asyncGetTransactions = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      const { transactions }: { transactions: ITransaction[] | never[] } = await api.getAllTransctions()
      dispatch(receiveTransactionsActionCreator(transactions))
    } catch (error: any) {
      console.error(error.message)
    }
  }
}

export {
  ActionType,
  asyncGetTransactions
}
