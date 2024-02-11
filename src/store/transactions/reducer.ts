import type ITransaction from '@/types/transaction'
import { ActionType } from '../transactions/action'

const transactionsReducer = (transactions: ITransaction[] | never[] = [], action: any): ITransaction[] | never[] => {
  switch (action.type) {
  case ActionType.RECEIVE_TRANSACTIONS:
    return action.payload.transactions
  default:
    return transactions
  }
}

export default transactionsReducer
