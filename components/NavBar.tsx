import {
  useColorMode,
  useColorModeValue,
  Box,
  Flex,
  Stack,
  Button,
  MenuButton,
  Avatar,
  Center,
  Menu,
  MenuList,
  MenuDivider,
  MenuItem,
  Link,
  Text,
  Container,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Scraper',
      href: '/twitter-scraper',
    },
    {
      label: 'About',
      href: '/about',
    },
  ]

  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Container maxWidth={'container.lg'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Box className={'flex flex-row'}>
              <Text className={'mr-4'}>Suvam0451</Text>
              {NAV_ITEMS.map((ele, i) => (
                <Box key={i} mx={2}>
                  <Link
                    href={ele.href ?? '#'}
                    color={linkColor}
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}
                  >
                    {ele.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default NavBar
