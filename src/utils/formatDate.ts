const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Jum\'at', 'Sabtu']

const formatDate = (rawDate: string): string => {
  const date = new Date(rawDate)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const second = date.getSeconds()

  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} - 
  ${hours <= 9 ? `0${hours}` : hours}:${minutes <= 9 ? `0${minutes}` : minutes}:${second <= 9 ? `0${second}` : second}`
}

export default formatDate
