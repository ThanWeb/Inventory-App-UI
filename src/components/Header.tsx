import { type ReactElement } from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { HiOutlineUser, HiOutlineArrowRightOnRectangle, HiBars3 } from 'react-icons/hi2'
import { type IStateUser } from '@/store/user/action'

interface IHeaderProps {
  user: IStateUser | null
  handleLogout: () => Promise<void>
  isNavShowed: boolean
  setIsNavShowed: (param: boolean) => void
  isDropdownShowed: boolean
  setIsDropdownShowed: (param: boolean) => void
}

interface IProps {
  props: IHeaderProps
}

const inter = Inter({ subsets: ['latin'] })

const Header = ({ props }: IProps): ReactElement => {
  const renderDropdown = (): ReactElement => {
    return (
      <div className={`${!props.isDropdownShowed ? 'hidden' : 'flex'} absolute -right-4 top-14 bg-white shadow-md flex-col gap-y-3 p-3`}>
        <div className='flex items-center gap-x-4 justify-start'>
          <span className='flex'>
            <HiOutlineUser className='w-6 h-6 m-auto' />
          </span>
          <p>{props.user?.username}</p>
        </div>
        <button
          className='flex items-center gap-x-4 justify-start'
          type='button'
          onClick={() => { void props.handleLogout() }}
        >
          <span className='flex'>
            <HiOutlineArrowRightOnRectangle className='w-6 h-6 m-auto' />
          </span>
          <span>Keluar</span>
        </button>
      </div>
    )
  }

  return (
    <header className={`${inter.className} w-full sticky top-0 left-0 flex shadow-md z-20 bg-white`}>
      <div className='container flex justify-between items-center px-6 md:px-8 mx-auto'>
        <nav>
          <button
            type='button'
            className='flex'
            onClick={() => { props.setIsNavShowed(true) }}
          >
            <HiBars3 className='w-8 h-8 m-auto' />
          </button>
          <div
            className={`${props.isNavShowed ? '' : 'hidden'} fixed z-[25] bg-slate-300 opacity-30 w-screen h-screen top-0 left-0`}
            onClick={() => { props.setIsNavShowed(false) }}
          />
          <div
            id='navbar'
            className={`${props.isNavShowed ? '' : 'hide'} z-30 fixed top-0 w-1/2 md:w-4/12 lg:w-3/12 h-screen bg-white transition-all duration-200 py-6 px-4`}>
            <ul className='flex flex-col gap-y-3'>
              <li className='border-b border-b-sky-500 pb-3 text-center'>
                <Link
                  href='/'
                  onClick={() => { props.setIsNavShowed(false) }}
                >
                  Beranda
                </Link>
              </li>
              <li className='border-b border-b-sky-500 pb-3 text-center'>
                <Link
                  href='/add'
                  onClick={() => { props.setIsNavShowed(false) }}
                >
                  Tambah Produk
                </Link>
              </li>
              <li className='border-b border-b-sky-500 pb-3 text-center'>
                <Link
                  href='/sale'
                  onClick={() => { props.setIsNavShowed(false) }}
                >
                  Tambah Penjualan
                </Link>
              </li>
              <li className='border-b border-b-sky-500 pb-3 text-center'>
                <Link
                  href='/transaction'
                  onClick={() => { props.setIsNavShowed(false) }}
                >
                  Riwayat Penjualan
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          {
            props.user === null
              ? <Link href='/sign-in'>Masuk</Link>
              : <>
                <div className='relative py-3 lg:hidden'>
                  <button
                    type='button'
                    className='flex'
                    onClick={() => { props.setIsDropdownShowed(!props.isDropdownShowed) }}
                  >
                    <HiOutlineUser className='w-8 h-8 m-auto' />
                  </button>
                  {
                    renderDropdown()
                  }
                </div>
                <div
                  className='relative py-3 hidden lg:block'
                  onMouseOver={() => { props.setIsDropdownShowed(true) }}
                  onMouseLeave={() => { props.setIsDropdownShowed(false) }}
                >
                  <button type='button' className='flex'>
                    <HiOutlineUser className='w-8 h-8 m-auto' />
                  </button>
                  {
                    renderDropdown()
                  }
                </div>
              </>
          }
        </div>
      </div>
    </header>
  )
}

export default Header
