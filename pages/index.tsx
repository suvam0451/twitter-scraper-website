import type { NextPage } from 'next'
import Head from 'next/head'
import BaseLayout from '../layouts/BaseLayout'
import styles from '../styles/Home.module.css'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, chakra } from '@chakra-ui/react'
import ContactBlock from '../components/home/ContactBlock'
import FeaturedProject from '../components/home/FeaturedProject'
import {Text} from "@chakra-ui/react"

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <h1>Debashish Patra</h1>
          <Tabs>
            <TabList>
              <Tab>Home</Tab>
              <Tab>Projects</Tab>
              <Tab>Portfolio</Tab>
              <Tab>About Me</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box backgroundColor={'blue.50'} paddingX={'8'} paddingY={6} rounded={'lg'}>
                  <h1>
                    👋 Hi, I'm Debashish.
                  </h1>
                  <p className={"about-me"}>
                    I'm a India-based software engineer who specializes in building
                    exceptional digital experiences.

                  </p>
                  <p>
                    Currently, I am an engineer
                    at <a href={'https://tvsd.ai'} target={'_blank'}>TVS Digital</a> {" "}
                    leading the development and delivery of  fin-tech/auto-tech products.
                  </p>
                  <ContactBlock/>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Text fontWeight={600} fontSize={24} textAlign={"left"}>
            03. Some Things I've Built
          </Text>

          <FeaturedProject title={"Sleeping Forest"}
          techStack={["react", "typescript"]}
                           description={""}
            imageUrl="https://camo.githubusercontent.com/3ade1b3d8d32c8befc0fa6f7a4da7b184bfbb4eea778d6b2d683c8cdc91bb1ef/68747470733a2f2f692e696d6775722e636f6d2f363030337546592e676966"
                           highlightedLabel={"Featured Project"}
          >
            <Text>
              During my senior years, I made a {" "}
              <abbr title={"Visual Studio Code"}>VSCode</abbr> extension
              for {" "} <abbr title={"Unreal Engine 4"}>UE4</abbr>
            </Text>
          </FeaturedProject>

          <FeaturedProject title={"Desktop App for Image Analysis"}
                           techStack={["react", "typescript"]}
                           description={""}
                           imageUrl="https://github.com/suvam0451/desktop-app/raw/develop/Gallery/Exhibit2.png"
                           highlightedLabel={"M.Tech Project"}
          >
            <Text>
              As part of my M.Tech. project, I
              created a <abbr title={"Model-View-ViewModel"}>MVVM</abbr> application that wraps a
              {" "}<a href={"https://github.com/AlexeyAB/darknet"}>
                C Image Detection Library</a> {" "} to run popular models.
              </Text>
            <Text>
              I saw running models on your GPU to be a very tedious setup,
              so I created an app to simplify this with an intuitive
              user interface.</Text>
          </FeaturedProject>


          <FeaturedProject title={"iRAP Assistant"}
                           techStack={["react", "typescript"]}
                           description={""}
                           imageUrl="https://github.com/suvam0451/desktop-app/raw/develop/Gallery/Exhibit2.png"
                           highlightedLabel={"B.Tech Project"}
          >
            <Text>
              As part of my B.Tech. project, I
              created a <abbr title={"Model-View-ViewModel"}>MVVM</abbr> application that wraps a
              {" "}<a href={"https://github.com/AlexeyAB/darknet"}>
              C Image Detection Library</a> {" "} to run popular models.
            </Text>
            <Text>
              I saw running models on your GPU to be a very tedious setup,
              so I created an app to simplify this with an intuitive
              user interface.</Text>
          </FeaturedProject>

          <p className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.tsx</code>
          </p>
        </main>
      </div>
    </BaseLayout>
  )
}

export default Home
