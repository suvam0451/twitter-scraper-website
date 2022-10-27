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
      <meta name="description" content="mugi: this site is UUUOHH, awawawa"/>
      {/* Discord Embed */}
      <meta property="og:site_name" content="NSFW Scraping Tool" />
      <meta property="og:image" content="https://cdn.discordapp.com/emojis/894894327736717342.webp" />
      <meta name="theme-color" content="#55bbee" />
      <meta name="twitter:card" content="summary_large_image" />
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
