import { type ReactElement } from 'react'

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
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => { void props.onSubmitHandler(event) }}>
      <div>
        <label htmlFor='username'>Nama Pengguna</label>
        <input
          id='username'
          type='text'
          value={props.username}
          onChange={(event) => { props.setUsername(event.target.value) }}
          placeholder='John Doe'
          required
        />
      </div>
      <div>
        <label htmlFor='password'>Kata Sandi</label>
        <div>
          <input
            type={props.showPassword ? 'text' : 'password'}
            value={props.password}
            id='password'
            onChange={(e) => { props.setPassword(e.target.value) }}
            required
          />
          <button
            type='button'
            title='toggle-password'
            onClick={props.togglePasswordVisibility}>
            {
              props.showPassword
                ? 'Sembunyikan'
                : 'Tampilkan'
            }
          </button>
        </div>
      </div>
      <div>
        <button type='submit'>
          {
            props.isLoginPage ? 'Masuk' : 'Daftar'
          }
        </button>
      </div>
    </form>
  )
}

export default AuthForm
