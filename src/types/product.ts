export default interface IProduct {
  id?: number,
  name: string,
  capitalPrice:number,
  sellPrice: number,
  stock: number,
  unit: string,
  isDeleted?: boolean,
  createdAt?: string,
  updatedAt?: string
}