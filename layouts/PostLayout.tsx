import { Box, Text, Container } from '@chakra-ui/react'

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
