import type { NextPage } from 'next'
import TwitterAccountSearch from '../components/TwitterAccountSearch'
import TwitterAccountSavedProfile from '../components/TwitterAccountSavedProfile'
import TwitterImageGallery from '../components/TwitterImageGallery'
import BaseLayout from '../layouts/BaseLayout'
import Head from "next/head"

import { Provider } from '../context/twitterProfileReducer'

const TwitterScraper: NextPage = () => {
  return (
    <>
    <Head>
      <title>NSFW media scraping tool</title>
      <meta property="og:title" content="NSFW media scraping tool" key="title" />
    </Head>
        <BaseLayout>
      <Provider>
        <TwitterAccountSearch />
        <TwitterAccountSavedProfile />
        <TwitterImageGallery />
      </Provider>
    </BaseLayout>
    </>
  )
}

export default TwitterScraper
