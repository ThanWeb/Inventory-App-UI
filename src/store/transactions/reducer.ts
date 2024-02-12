import type ITransaction from '@/types/transaction'
import { ActionType } from '../transactions/action'

const transactionsReducer = (transactions: ITransaction[] | never[] = [], action: any): ITransaction[] | never[] => {
  switch (action.type) {
  case ActionType.RECEIVE_TRANSACTIONS:
    return action.payload.transactions
  case ActionType.GET_TRANSACTION_DETAIL:
    return transactions.map((transaction) => {
      if (transaction.id === action.payload.id) {
        return action.payload.transaction
      }

      return transaction
    })
  default:
    return transactions
  }
}

export default transactionsReducer
