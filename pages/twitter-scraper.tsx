import type { NextPage } from 'next'
import TwitterAccountSearch from '../components/TwitterAccountSearch'
import PercentageWrapper from '../components/elements/PercentageWrapper'
import NavBar from '../components/NavBar'
import TwitterAccountSavedProfile from '../components/TwitterAccountSavedProfile'

const TwitterScraper: NextPage = () => {
  return (
    <>
      <NavBar />
      <TwitterAccountSearch />
      <TwitterAccountSavedProfile />
      <PercentageWrapper />
    </>
  )
}

export default TwitterScraper
