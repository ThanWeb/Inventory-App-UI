import type { IProduct } from '@/types/product'
import { ActionType } from '../products/action'

const productsReducer = (products: IProduct[] | never[] = [], action: any): IProduct[] | never[] => {
  switch (action.type) {
  case ActionType.RECEIVE_PRODUCTS:
    return action.payload.products
  case ActionType.CREATE_PRODUCT:
    return [...products, { ...action.payload.product, isDeleted: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]
  case ActionType.UPDATE_PRODUCT:
    return products.map((product) => {
      if (product.id === action.payload.id) {
        const { id, isDeleted, createdAt } = product
        return { id, ...action.payload.product, updatedAt: new Date().toISOString(), isDeleted, createdAt }
      }

      return product
    })
  case ActionType.DELETE_PRODUCT:
    return products.filter((product) => {
      return product.id !== action.payload.id
    })
  default:
    return products
  }
}

export default productsReducer
