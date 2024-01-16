import axios from 'axios'
import IProduct from '../types/product'

const showError = (error: any): any => {
  if (axios.isAxiosError(error)) {
    console.error(error?.response?.data)
    return error?.response?.data
  } else {
    console.error(error)
    return error
  }
}

const api = (() => {
  const BASE_URL = process.env.ENVIRONMENT === 'production' ? process.env.BASE_URL : 'http://localhost:8000/'

  const addProduct = async ({ name, capitalPrice, sellPrice, stock, unit }: IProduct): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}product`, { name, capitalPrice, sellPrice, stock, unit })
      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const getProducts = async (): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}product`)
      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const updateProduct = async ({ id, product: { name, capitalPrice, sellPrice, stock, unit } }: { id: number, product: IProduct }): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}product`, { id, name, capitalPrice, sellPrice, stock, unit })
      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const deleteProduct = async ({ id }: { id: number }): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}product/delete`, { id })
      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  return {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
  }
})()

export default api
