import type IProduct from '@/types/product'
import { Dispatch } from '@reduxjs/toolkit'
import api from '@/utils/api'

const ActionType = {
  RECEIVE_PRODUCTS: 'RECEIVE_PRODUCTS',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
}

const receiveProductsActionCreator = (products: IProduct[] | never[]): { type: string, payload: Record<string, any>} => {
  return {
    type: ActionType.RECEIVE_PRODUCTS,
    payload: {
      products
    }
  }
}

const createProductActionCreator = (product: IProduct) => {
  return {
    type: ActionType.CREATE_PRODUCT,
    payload: {
      product
    }
  }
}

const asyncGetProducts = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      const { products } = await api.getProducts()
      dispatch(receiveProductsActionCreator(products))
    } catch (error: any) {
      console.error(error.message)
    }
  }
}

const asyncAddProduct = ({ name, capitalPrice, sellPrice, stock, unit }: IProduct): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.addProduct({ name, capitalPrice, sellPrice, stock, unit })

      if (!response.error) {
        dispatch(createProductActionCreator(response.product))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export {
  ActionType,
  asyncGetProducts,
  asyncAddProduct
}