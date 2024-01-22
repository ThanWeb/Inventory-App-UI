import { useState, type ReactElement } from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { HiOutlineUser, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2'
import { type IStateUser } from '@/store/user/action'

interface IHederProps {
  user: IStateUser | null
  handleLogout: () => Promise<void>
}

const inter = Inter({ subsets: ['latin'] })

const Header = ({ handleLogout, user }: IHederProps): ReactElement => {
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
    <header className={`${inter.className} w-screen sticky top-0 left-0 flex justify-end px-8 py-3 shadow-md z-20 bg-white`}>
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
    </header>
  )
}

export default Header
