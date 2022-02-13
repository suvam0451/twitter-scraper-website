import { useMemo } from 'react'
import NextImage from 'next/image'
import { getMDXComponent } from 'mdx-bundler/client'
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from '../../lib/mdx'
import { MDXLayoutRenderer } from '../../components/blog/MDXComponents'
import { Box } from '@chakra-ui/react'

const DEFAULT_LAYOUT = 'PostLayout'
const PATH_TO_BLOGS = 'blog'

export const getStaticPaths = async () => {
  console.log("just chillin")
  const posts = getFiles(PATH_TO_BLOGS)
  return {
    paths: posts.map((p: string) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const allPosts = await getAllFilesFrontMatter(PATH_TO_BLOGS)

  // NOTE: next/previous feature
  // const postIndex = allPosts.findIndex(
  //   (post) => formatSlug(post.slug) === params.slug.join('/')
  // )
  //   const prev = allPosts[postIndex + 1] || null
  //   const next = allPosts[postIndex - 1] || null
  const post = await getFileBySlug(PATH_TO_BLOGS, params.slug.join('/'))

  // authors
  // const authorList = post.frontMatter.authors || ['default']
  // const authorPromise = authorList.map(async (author: any) => {
  //   const authorResults = await getFileBySlug('authors', [author])
  //   return authorResults.frontMatter
  // })
  // const authorDetails = await Promise.all(authorPromise)

  // rss
  // if (allPosts.length > 0) {
  //   const rss = generateRss(allPosts)
  //   fs.writeFileSync('./public/feed.xml', rss)
  // }

  return { props: { post } }
  // return { props: { post, authorDetails, prev, next } }
}

const Blog = ({ post }: any) => {
  const { mdxSource, toc, frontMatter } = post
  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={mdxSource}
          frontMatter
        />
      ) : (
        <Box>Under Construction</Box>
      )}
    </>
  )
}

export default Blog
