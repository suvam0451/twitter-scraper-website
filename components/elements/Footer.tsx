import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Grid,
  GridItem,
  Flex,
  Image,
  Badge,
  InputLeftElement,
  Text,
  Center,
  Container,
} from '@chakra-ui/react'
import {
  faCoffee,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faCloudDownload,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FOOTER_FONT_SIZE = 'sm'
const Footer = () => {
  return (
    <Box bgColor={'#171923'} className={'pb-4 pt-4 mt-2 w-full'}>
      <Center className="flex flex-col">
        <Box className="flex flex-row my-2">
          <FontAwesomeIcon
            icon={faHeart}
            color="red.00"
            opacity={0.5}
            size={'2x'}
          />
        </Box>
        <Box className={'inline-block'}>
          <Text
            className={'inline-block'}
            color={'#A3A3A3'}
            fontSize={FOOTER_FONT_SIZE}
          >
            Debashish Patra
          </Text>
          <Text
            className={'inline-block mx-1'}
            color={'#A3A3A3'}
            fontSize={FOOTER_FONT_SIZE}
          >
            {'•'}
          </Text>
          <Text
            className={'inline-block'}
            color={'#A3A3A3'}
            fontSize={FOOTER_FONT_SIZE}
          >
            ©2022
          </Text>
          <Text
            className={'inline-block mx-1'}
            color={'#A3A3A3'}
            fontSize={FOOTER_FONT_SIZE}
          >
            {'•'}
          </Text>
          <Text
            className={'inline-block'}
            color={'#A3A3A3'}
            fontSize={FOOTER_FONT_SIZE}
          >
            Portfolio Website
          </Text>
        </Box>
        <Box>
          <Text
            className={'inline-block'}
            color={'#A3A3A3'}
            fontSize={FOOTER_FONT_SIZE}
          >
            Made with love using Next.js
          </Text>
        </Box>
      </Center>
    </Box>
  )
}

export default Footer
