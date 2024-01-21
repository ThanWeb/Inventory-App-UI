import { type ReactElement } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

interface IAuthForm {
  isLoginPage: boolean
  username: string
  setUsername: (param: string) => void
  password: string
  setPassword: (param: string) => void
  showPassword: boolean
  togglePasswordVisibility: () => void
  onSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}

interface IProps {
  props: IAuthForm
}

const AuthForm = ({ props }: IProps): ReactElement => {
  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => { void props.onSubmitHandler(event) }}
      className='flex flex-col gap-y-4'
    >
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='username'>Nama Pengguna</label>
        <input
          id='username'
          type='text'
          className='border border-blue-950 w-full py-3 px-2'
          value={props.username}
          onChange={(event) => { props.setUsername(event.target.value) }}
          placeholder='John Doe'
          autoComplete='off'
          autoCorrect='off'
          required
        />
      </div>
      <div className='flex flex-col gap-y-2'>
        <label htmlFor='password'>Kata Sandi</label>
        <div className='w-full relative flex items-center'>
          <input
            type={props.showPassword ? 'text' : 'password'}
            value={props.password}
            className='border border-blue-950 w-full py-3 px-2'
            id='password'
            placeholder='secret'
            onChange={(e) => { props.setPassword(e.target.value) }}
            required
          />
          <button
            type='button'
            title='toggle-password'
            className='absolute right-0'
            onClick={props.togglePasswordVisibility}>
            {
              props.showPassword
                ? <HiEyeOff className='w-6 h-6 mr-3'/>
                : <HiEye className='w-6 h-6 mr-3'/>
            }
          </button>
        </div>
      </div>
      <div className='mt-2'>
        <button type='submit' className='bg-blue-950 text-white w-full py-3 px-1 text-center'>
          {
            props.isLoginPage ? 'Masuk' : 'Daftar'
          }
        </button>
      </div>
    </form>
  )
}

export default AuthForm
