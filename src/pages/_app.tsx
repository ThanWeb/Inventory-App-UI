import type { AppProps } from 'next/app'
import { type ReactElement, Fragment } from 'react'
import { Provider } from 'react-redux'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { Page } from '@/types/page'
import store from '@/store'
import '@/styles/globals.css'

type Props = AppProps & {
  Component: Page
}

export default function App ({ Component, pageProps }: Props): ReactElement {
  const getLayout = Component.getLayout ?? (page => page)
  const Layout = Component.layout ?? Fragment

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <Layout>
          {getLayout(<Component {...pageProps} />)}
        </Layout>
      </Provider>
    </LocalizationProvider>
  )
}
