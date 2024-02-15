interface IProduct {
  id?: number
  createdBy?: number
  lastUpdatedBy?: number
  name: string
  capitalPrice: number
  sellPrice: number
  stock: number
  unit: string
  imageUrl?: string
  isDeleted?: boolean
  createdAt?: string
  updatedAt?: string
}

interface IProductInput {
  name: string
  capitalPrice: number | string
  sellPrice: number | string
  stock: number | string
  unit: string
}

export type { IProduct, IProductInput }
