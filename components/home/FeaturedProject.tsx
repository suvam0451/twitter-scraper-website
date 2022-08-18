import { Box, chakra, Flex, HStack, Text } from '@chakra-ui/react'
import Image from "next/image"
// icons
import {SiTypescript, SiReact, SiRedux} from "react-icons/si"

const CSiTypescript = chakra(SiTypescript)
const CSiReact = chakra(SiReact)
const CSiRedux = chakra(SiRedux)


type FeaturedProjectProps = {
  techStack: string[]
  description: string
  title: string
  highlightedLabel?: string
  imageUrl: string
  githubLink?: string
  externalLink?: string
  children?: any
}
const FeaturedProject = ({
                           techStack,
                           description,
                           title,
                           highlightedLabel,
                           imageUrl,
                           githubLink,
                           externalLink,
  children
                         }: FeaturedProjectProps) => {

  const EvaluateTechStack = (items: string[]) => {
    const A = []
    for (const item of items) {
      switch(item) {
        case "typescript":
          A.push(<CSiTypescript size={24}/>)
          break
        case "react":
          A.push(<CSiReact size={24}/>)
          break
        case "redux":
          A.push(<CSiRedux size={24}/>)
          break
        default:
          break
      }
    }
    console.log(A)
    return A
  }

  return <Box width={"full"}>

    <Flex>
      <Box flex={'1'} position={"relative"}>
        <Box position={"absolute"} mr={"-8"} mt={"4"} >

          {highlightedLabel ?<Text fontSize={14}>{highlightedLabel}</Text>: <></>}
          <a href={"https://marketplace.visualstudio.com/items?itemName=suvam0451.sleeping-forest-ue4"}>
            <h3>
              {title}
            </h3>
          </a>
          <Box backgroundColor={"blue.50"} padding={4} my={2}>
            <Text className={"text-sm"}>{children}</Text>
          </Box>
          <HStack>
            {EvaluateTechStack(techStack).map((o) => o)}
          </HStack>
        </Box>
      </Box>
      <Box flex={'1'} ml={"-8"} pt={4}>
        <img alt={"Project Image"} src={imageUrl} width={500} height={600}/>
      </Box>
    </Flex>

  </Box>
}

export default FeaturedProject