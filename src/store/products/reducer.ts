import type IProduct from '@/types/product'
import { ActionType } from '../products/action'

const productsReducer = (products: IProduct[] | never[] = [], action: any): IProduct[] | never[] => {
  switch (action.type) {
  case ActionType.RECEIVE_PRODUCTS:
    return action.payload.products
  case ActionType.CREATE_PRODUCT:
    return [ ...products, { ...action.payload.product, isDeleted: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]
  default:
    return products
  }
}

export default productsReducer
