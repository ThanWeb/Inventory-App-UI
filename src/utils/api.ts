import axios from 'axios'
import type IProduct from '../types/product'
import type ICart from '../types/cart'

const showError = (error: any): any => {
  if (axios.isAxiosError(error)) {
    if (error.message === 'Network Error') {
      return {
        error: true,
        message: error.message
      }
    }

    return error?.response?.data
  } else {
    return error
  }
}

axios.defaults.withCredentials = true

const api = (() => {
  const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : 'https://inventory-app-rest-api.up.railway.app/'

  const putAccessToken = (token: string): void => {
    localStorage.setItem('accessToken', token)
  }

  const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken')
  }

  const deleteAccessToken = (): void => {
    localStorage.removeItem('accessToken')
  }

  const registerAdmin = async ({ username, password }: { username: string, password: string }): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}admin/register`, { username, password })
      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const loginAdmin = async ({ username, password }: { username: string, password: string }): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}admin/login`, { username, password })
      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const verifyToken = async (): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}verify`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })

      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const logout = async (): Promise<any> => {
    try {
      const response = await axios.delete(`${BASE_URL}logout`)
      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const addProduct = async ({ name, capitalPrice, sellPrice, stock, unit }: IProduct): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}product`, { name, capitalPrice, sellPrice, stock, unit }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })

      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const addMultipleProduct = async ({ products }: { products: IProduct[] }): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}product/multiple`, { products }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const getProducts = async (): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}product`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })

      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const updateProduct = async ({ id, product: { name, capitalPrice, sellPrice, stock, unit } }: { id: number, product: IProduct }): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}product`, { id, name, capitalPrice, sellPrice, stock, unit }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })

      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const deleteProduct = async ({ id }: { id: number }): Promise<any> => {
    try {
      const response = await axios.put(`${BASE_URL}product/delete`, { id }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })

      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const addTransactionAdmin = async ({ total, cart }: { total: number, cart: ICart[] }): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}admin/transaction`, { total, cart }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })

      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  return {
    putAccessToken,
    getAccessToken,
    deleteAccessToken,
    registerAdmin,
    loginAdmin,
    verifyToken,
    logout,
    addProduct,
    addMultipleProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    addTransactionAdmin
  }
})()

export default api
