// kasih switch case klo rupiah ya cetak yg rupiah
// buat fitur di transaction history, data yang muncul cuma penjualan hari ini, terus bisa ganti tanggal

const formatPrice = (rawPrice: string): string => {
  let temp = ''
  let formattedPrice = ''
  const priceParts = []

  for (let i = rawPrice.length; i > 0; i--) {
    temp = rawPrice[i - 1] + temp

    if (temp.length === 3) {
      priceParts.push(temp)
      temp = ''
    }
  }

  if (temp.length > 0) {
    priceParts.push(temp)
  }

  for (let i = priceParts.length; i > 0; i--) {
    formattedPrice += priceParts[i - 1]

    if (i > 1) {
      formattedPrice += '.'
    }
  }

  return formattedPrice ?? '-'
}

export default formatPrice
