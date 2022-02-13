import { Box, Text, Container, Button } from '@chakra-ui/react'
import Footer from '../components/elements/Footer'
import NavBar from '../components/NavBar'

const BaseLayout = ({ children }: any) => {
  return (
    <Box minHeight={'100vh'} className={'flex flex-col bg-white'}>
      <Box className="w-full flex-none">
        <NavBar />
      </Box>
      <Box className={'flex flex-col flex-1'}>
        <Box className={'flex-1'}>
          <Container maxWidth={'container.lg'}>{children}</Container>
        </Box>
        <Box className={'flex-0'}>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}

export default BaseLayout
