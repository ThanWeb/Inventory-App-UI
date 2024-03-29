import axios from 'axios'
import type { IProductInput } from '@/types/product'
import type ICart from '../types/cart'
import { type Dayjs } from 'dayjs'

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
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

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

  const addProduct = async ({ product: { name, capitalPrice, sellPrice, stock, unit }, image }: { product: IProductInput, image: any }): Promise<any> => {
    try {
      let imageUrl = ''

      if (image !== null) {
        const formData = new FormData()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        formData.append('image', image)

        const responseImage: Record<string, any> = await axios.post(`${BASE_URL}product/image`, formData, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        })

        if (responseImage.data.error === true) {
          return {
            error: true,
            message: 'Terjadi Kesalahan, Silahkan Upload Ulang'
          }
        }

        imageUrl = responseImage.data.image
      }

      const response = await axios.post(`${BASE_URL}product`, { name, capitalPrice, sellPrice, stock, unit, imageUrl }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })

      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const addMultipleProduct = async ({ products }: { products: IProductInput[] }): Promise<any> => {
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

  const updateProduct = async ({ id, product: { name, capitalPrice, sellPrice, stock, unit }, image }: { id: number, product: IProductInput, image: any }): Promise<any> => {
    try {
      let imageUrl = ''

      if (image !== null) {
        const formData = new FormData()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        formData.append('image', image)

        const responseImage: Record<string, any> = await axios.post(`${BASE_URL}product/image`, formData, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        })

        if (responseImage.data.error === true) {
          return {
            error: true,
            message: 'Terjadi Kesalahan, Silahkan Upload Ulang'
          }
        }

        imageUrl = responseImage.data.image
      }

      const response = await axios.put(`${BASE_URL}product`, { id, name, capitalPrice, sellPrice, stock, unit, imageUrl }, {
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

  const addTransactionAdmin = async ({ cart }: { cart: ICart[] }): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}admin/transaction`, { cart }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })

      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const getAllTransactions = async (selectedDate: Dayjs): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}admin/transaction?date=${selectedDate.toISOString()}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      })

      return response.data
    } catch (error: any) {
      return showError(error)
    }
  }

  const getTransactionDetail = async (id: number): Promise<any> => {
    try {
      const response = await axios.get(`${BASE_URL}admin/transaction/${id}`, {
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
    addTransactionAdmin,
    getAllTransactions,
    getTransactionDetail
  }
})()

export default api
