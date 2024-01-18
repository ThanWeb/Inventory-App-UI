const translateProductProps = (param: string): string => {
  switch (param) {
  case 'name':
    return 'Nama'
  case 'capitalPrice':
    return 'Modal'
  case 'sellPrice':
    return 'Harga Jual'
  case 'stock':
    return 'Stok'
  case 'unit':
    return 'Satuan'
  case 'updatedAt':
    return 'Diperbarui Pada'
  case 'createdAt':
    return 'Ditambahkan Pada'
  default:
    return param
  }
}

export default translateProductProps
