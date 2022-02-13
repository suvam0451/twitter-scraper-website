import type { NextPage } from 'next'
import TwitterAccountSearch from '../components/TwitterAccountSearch'
import TwitterAccountSavedProfile from '../components/TwitterAccountSavedProfile'
import TwitterImageGallery from '../components/TwitterImageGallery'
import BaseLayout from '../layouts/BaseLayout'

import { Provider } from '../context/twitterProfileReducer'

const TwitterScraper: NextPage = () => {
  return (
    <BaseLayout>
      <Provider>
        <TwitterAccountSearch />
        <TwitterAccountSavedProfile />
        <TwitterImageGallery />
      </Provider>
    </BaseLayout>
  )
}

export default TwitterScraper
