import { useState, type ReactElement } from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { HiOutlineUser, HiOutlineArrowRightOnRectangle, HiBars3 } from 'react-icons/hi2'
import { type IStateUser } from '@/store/user/action'

interface IHederProps {
  user: IStateUser | null
  handleLogout: () => Promise<void>
}

const inter = Inter({ subsets: ['latin'] })

const Header = ({ handleLogout, user }: IHederProps): ReactElement => {
  const [isNavShowed, setIsNavShowed] = useState(false)
  const [isDropdownShowed, setIsDropdownShowed] = useState(false)

  const renderDropdown = (): ReactElement => {
    return (
      <div className={`${!isDropdownShowed ? 'hidden' : 'flex'} absolute -right-4 top-10 bg-white shadow-md flex-col gap-y-3 p-3`}>
        <div className='flex items-center gap-x-4 justify-start'>
          <span className='flex'>
            <HiOutlineUser className='w-6 h-6 m-auto' />
          </span>
          <p>{user?.username}</p>
        </div>
        <button className='flex items-center gap-x-4 justify-start' type='button' onClick={() => { void handleLogout() }}>
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
      <div className='container flex justify-between items-center px-6 md:px-8 py-3 mx-auto'>
        <nav>
          <button type='button' className='flex' onClick={() => { setIsNavShowed(true) }}>
            <HiBars3 className='w-8 h-8 m-auto' />
          </button>
          <div
            className={`${isNavShowed ? '' : 'hidden'} fixed z-[25] bg-slate-300 opacity-30 w-screen h-screen top-0 left-0`}
            onClick={() => { setIsNavShowed(false) }}
          />
          <div id='navbar' className={`${isNavShowed ? '' : 'hide'} z-30 fixed top-0 w-1/2 md:w-4/12 lg:w-3/12 h-screen bg-white transition-all duration-200 py-6 px-4`}>
            <ul className='flex flex-col gap-y-3'>
              <li className='border-b border-b-sky-500 pb-3 text-center'>
                <Link href='/' onClick={() => { setIsNavShowed(false) }}>Beranda</Link>
              </li>
              <li className='border-b border-b-sky-500 pb-3 text-center'>
                <Link href='/add' onClick={() => { setIsNavShowed(false) }}>Tambah Produk</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          {
            user === null
              ? <Link href='/sign-in'>Masuk</Link>
              : <>
                <div className='relative lg:hidden'>
                  <button type='button' className='flex' onClick={() => { setIsDropdownShowed(!isDropdownShowed) }}>
                    <HiOutlineUser className='w-8 h-8 m-auto' />
                  </button>
                  {
                    renderDropdown()
                  }
                </div>
                <div className='relative hidden lg:block' onMouseOver={() => { setIsDropdownShowed(true) }} onMouseLeave={() => { setIsDropdownShowed(false) }}>
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
