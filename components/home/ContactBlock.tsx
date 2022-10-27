import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { Box, chakra, Flex, HStack } from '@chakra-ui/react'

const CBsGithub = chakra(BsGithub)
const CBsLinkedin = chakra(BsLinkedin)

const ContactBlock = () => {
  return <Box>
    <Flex direction={'row-reverse'}>
      <HStack marginLeft={'auto'}>
        <CBsGithub size={'32'} />
        <a>

        </a>
        <a href={'https://www.linkedin.com/in/suvam0451/'}>
          <CBsLinkedin size={'32'} _hover={{
            color: '#0077b5',
          }} />
        </a>

      </HStack>
    </Flex>


  </Box>
}

export default ContactBlock