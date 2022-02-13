import type { NextPage } from 'next'
import TwitterAccountSearch from '../components/TwitterAccountSearch'
import PercentageWrapper from '../components/elements/PercentageWrapper'
import NavBar from '../components/NavBar'
import TwitterAccountSavedProfile from '../components/TwitterAccountSavedProfile'
import TwitterImageGallery from '../components/TwitterImageGallery'
import ViewSelection from '../components/elements/ViewSelection'

const TwitterScraper: NextPage = () => {
  return (
    <>
      <NavBar />
      <TwitterAccountSearch />

      <TwitterAccountSavedProfile />
      <TwitterImageGallery/>
      <ViewSelection />
      {/* <PercentageWrapper /> */}
    </>
  )
}

export default TwitterScraper
