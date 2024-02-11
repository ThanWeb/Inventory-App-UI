export default interface ITransaction {
  total: number
  isUnpaid: boolean
  createdAt: string
  owner: {
    username: string
    role: string
  }
  carts?: ITransactionCart[]
}

interface ITransactionCart {
  total: number
  createdAt: string
  product: {
    name: string
    sellPrice: number
    unit: string
  }
}
