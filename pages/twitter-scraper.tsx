import type { NextPage } from 'next'
import TwitterAccountSearch from '../components/TwitterAccountSearch'
import PercentageWrapper from '../components/elements/PercentageWrapper'
import NavBar from '../components/NavBar'
import TwitterAccountSavedProfile from '../components/TwitterAccountSavedProfile'
import TwitterImageGallery from '../components/TwitterimageGallery'

const TwitterScraper: NextPage = () => {
  return (
    <>
      <NavBar />
      <TwitterAccountSearch />

      <TwitterAccountSavedProfile />
      <TwitterImageGallery/>
      {/* <PercentageWrapper /> */}
    </>
  )
}

export default TwitterScraper
