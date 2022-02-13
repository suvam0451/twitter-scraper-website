import { Box, Text } from '@chakra-ui/react'
import { Container } from '@chakra-ui/icons'

const PostLayout = ({ children, frontMatter }: any) => {
  const { slug, fileName } = frontMatter

  return (
    <Container maxWidth={'lg'}>
      <Box>
        <Text>{slug}</Text>
        <Text>{fileName}</Text>
        {children}
      </Box>
    </Container>
  )
}

export default PostLayout
