import { Box, Text, Container } from '@chakra-ui/react'
import BaseLayout from '../layouts/BaseLayout'

const PostLayout = ({ children, frontMatter }: any) => {
  const { slug, fileName } = frontMatter

  return (
    <BaseLayout>
      <Text>{slug}</Text>
      <Text>{fileName}</Text>
      {children}
    </BaseLayout>
  )
}

export default PostLayout
