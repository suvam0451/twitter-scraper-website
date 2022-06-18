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
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
  external?: boolean
}

const NavigationSublinkArray = ({ ele }: any) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const linkColor = useColorModeValue('gray.200', 'gray.200')
  const linkHoverColor = useColorModeValue('white', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return <>
    <Stack bg={useColorModeValue('gray.900', 'gray.900')} rounded={"lg"} paddingX={"4"} paddingY={4}>
      {ele.children.map((e, i) => <Box>
        <Box marginBottom={"2"}>
          {i > 0 ? <Divider width={"full"} /> : <></>}
        </Box>
        <Box
          rounded={"lg"}
          padding={2}
          transition={'all .3s ease'}
          _hover={{ backgroundColor: "gray.600" }}>
          <Link
            role={'group'}
            display={'block'}
            href={ele.href ?? '#'}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            <Text fontWeight={600}>{e.label}</Text>
            <Text fontSize={'sm'} fontWeight={200}>{e.subLabel}</Text>
          </Link>
        </Box>
      </Box>)}

    </Stack>
  </>
}
const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const NAV_ITEMS: Array<NavItem> = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Project',
      href: '/nsfw-scraper',
      children: [{
        label: "Twitter Scraper",
        subLabel: "follow and save images from your favourite creator",
        href: 'twitter.suvam0451.com',
        external: true
      }, {
        label: "Skyblock Market Tracker",
        subLabel: "find the items with best profit margins",
        href: 'skyblock.suvam0451.com',
        external: true
      },
      {
        label: "Imageboard Scraping Assistant",
        subLabel: "download images in bulk",
        href: "https://scraper.suvam0451.com",
        external: true
      }]
    },
    {
      label: "Tools",
      href: "/tools",
      children: [
        {
          label: "Sleeping Forest",
          subLabel: "Feature-rich Gamedev extension for unreal engine"
        }]
    },
    {
      label: 'About',
      href: '/about',
    },
  ]

  const linkColor = useColorModeValue('gray.200', 'gray.200')
  const linkHoverColor = useColorModeValue('white', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box bg={useColorModeValue('gray.900', 'gray.900')} px={4}>
      <Container maxWidth={'container.lg'}>
        <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Box className={'flex flex-row'}>
              <Text className={'mr-4'}>Suvam0451</Text>
              {NAV_ITEMS.map((ele, i) => (
                <Box key={i} mx={4}>
                  <Popover trigger={"hover"} placement={"bottom-start"}>
                    <PopoverTrigger>
                      <Link href={ele.href}>
                        <Text fontSize={20} color={linkColor}>
                          {ele.label}
                        </Text>
                      </Link>
                    </PopoverTrigger>
                    {ele.children &&
                      <PopoverContent
                        border={0}
                        boxShadow={'xl'}
                        width={"sm"}
                      >
                        <NavigationSublinkArray ele={ele} />
                      </PopoverContent>
                    }
                  </Popover>
                </Box>
              ))}
            </Box>
          </Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode} size={"sm"}>
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
