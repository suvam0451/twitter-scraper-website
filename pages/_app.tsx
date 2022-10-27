import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { config } from '@fortawesome/fontawesome-svg-core'

import '@fortawesome/fontawesome-svg-core/styles.css'
import Head from 'next/head'
config.autoAddCss = false

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
