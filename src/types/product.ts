export default interface IProduct {
  id?: number
  createdBy?: number
  lastUpdatedBy?: number
  name: string
  capitalPrice: number
  sellPrice: number
  stock: number
  unit: string
  isDeleted?: boolean
  createdAt?: string
  updatedAt?: string
}
