import type { IProduct, IProductInput } from '@/types/product'
import { type Dispatch } from '@reduxjs/toolkit'
import api from '@/utils/api'

const ActionType = {
  RECEIVE_PRODUCTS: 'RECEIVE_PRODUCTS',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT'
}

const receiveProductsActionCreator = (products: IProduct[] | never[]): { type: string, payload: Record<string, any> } => {
  return {
    type: ActionType.RECEIVE_PRODUCTS,
    payload: {
      products
    }
  }
}

const createProductActionCreator = (product: IProductInput): { type: string, payload: Record<string, any> } => {
  return {
    type: ActionType.CREATE_PRODUCT,
    payload: {
      product
    }
  }
}

const updateProductActionCreator = (id: number, product: IProduct): { type: string, payload: Record<string, any> } => {
  return {
    type: ActionType.UPDATE_PRODUCT,
    payload: {
      id,
      product
    }
  }
}

const deleteProductActionCreator = (id: number): { type: string, payload: Record<string, any> } => {
  return {
    type: ActionType.DELETE_PRODUCT,
    payload: {
      id
    }
  }
}

const asyncGetProducts = (): any => {
  return async (dispatch: Dispatch) => {
    try {
      const { products }: { products: IProduct[] | never[] } = await api.getProducts()
      dispatch(receiveProductsActionCreator(products))
    } catch (error: any) {
      console.error(error.message)
    }
  }
}

const asyncAddProduct = ({ product: { name, capitalPrice, sellPrice, stock, unit }, image }: { product: IProductInput, image: any }): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response: { error: boolean, product: IProduct } = await api.addProduct({ product: { name, capitalPrice, sellPrice, stock, unit }, image })

      if (!response.error) {
        dispatch(createProductActionCreator(response.product))
      }

      return response
    } catch (error) {
      console.error(error)
    }
  }
}

const asyncAddMultipleProduct = ({ products }: { products: IProductInput[] }): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response: { error: boolean, product: IProduct } = await api.addMultipleProduct({ products })
      return response
    } catch (error) {
      console.error(error)
    }
  }
}

const asyncEditProduct = ({ id, product: { name, capitalPrice, sellPrice, stock, unit }, image }: { id: number, product: IProductInput, image: any }): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response: { error: boolean, message: string, product: undefined | IProduct } = await api.updateProduct({ id, product: { name, capitalPrice, sellPrice, stock, unit }, image })

      if (!response.error && response.product !== undefined) {
        dispatch(updateProductActionCreator(id, response.product))
      }

      return response
    } catch (error) {
      console.error(error)
    }
  }
}

const asyncDeleteProduct = ({ id }: { id: number }): any => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.deleteProduct({ id })

      if (!response.error) {
        dispatch(deleteProductActionCreator(id))
      }

      return response
    } catch (error) {
      console.error(error)
    }
  }
}

export {
  ActionType,
  asyncGetProducts,
  asyncAddProduct,
  asyncAddMultipleProduct,
  asyncEditProduct,
  asyncDeleteProduct
}
