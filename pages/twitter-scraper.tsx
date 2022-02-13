import type { NextPage } from 'next'
import TwitterAccountSearch from '../components/TwitterAccountSearch'
import PercentageWrapper from '../components/elements/PercentageWrapper'
import NavBar from '../components/NavBar'
import TwitterAccountSavedProfile from '../components/TwitterAccountSavedProfile'
import TwitterImageGallery from '../components/TwitterImageGallery'
import ViewSelection from '../components/elements/ViewSelection'
import BaseLayout from '../layouts/BaseLayout'

const TwitterScraper: NextPage = () => {
  return (
    <BaseLayout>
      <TwitterAccountSearch />
      <TwitterAccountSavedProfile />
      <TwitterImageGallery />
      {/* <ViewSelection /> */}
    </BaseLayout>
  )
}

export default TwitterScraper
