import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'

import { bundleMDX } from 'mdx-bundler'

import { visit } from 'unist-util-visit'

import getAllFilesRecursively from './utils/files'


// Remark packages
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
// Remark packages (extended)
// import remarkExtractFrontmatter from './remark/remark-extract-frontmatter'
// import remarkCodeTitles from './remark/remark-code-title'
// import remarkTocHeadings from './remark/remark-toc-headings'
// import remarkImgToJsx from './remark/remark-img-to-jsx'

// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'

const root = process.cwd()

const getFilesInDir = (path: string) => {
  return [
    '/Users/suvam/Documents/Repos/Github/twitter-scraper-website/data/blog/hello-world.md',
  ]
}

export function getFiles(type: string) {
  const prefixPaths = path.join(process.cwd(), 'data', type)
  // const files = getAllFilesRecursively(prefixPaths)
  const files = ["/Users/suvam/Documents/Repos/Github/twitter-scraper-website/data/blog/hello-world.md"]
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file: any) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
  )
}

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, '')
}

export const dateSortDesc = (a: Date, b: Date) => {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getFileBySlug(type: string, slug: string) {
  const mdxPath = path.join(process.cwd(), 'data', type, `${slug}.mdx`)
  const mdPath = path.join(process.cwd(), 'data', type, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  let toc = []

  const { code, frontmatter } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(process.cwd(), 'components'),
    xdmOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        // remarkExtractFrontmatter,
        // [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        // remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        /**
         * Due to the reliance on next/image, unless you are using an external
         * image CDN like Cloudinary or Imgix, it is practically required to use
         * Vercel for hosting. This is because the component acts like a serverless
         * function that calls a highly optimized image CDN.
         *
         * If you do not want to be tied to Vercel, you can remove imgToJsx in
         * remarkPlugins in lib/mdx.js. This would avoid substituting the default img tag.
         */
        // remarkImgToJsx,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypeCitation, { path: path.join(process.cwd(), 'data') }],
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      return options
    },
  })

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      authors: []
    },
  }
}

export async function getAllFilesFrontMatter(folder) {
  const prefixPaths = path.join(process.cwd(), 'data', folder)

  // const files = getFilesInDir(prefixPaths)
  const files = [
    '/Users/suvam/Documents/Repos/Github/twitter-scraper-website/data/blog/hello-world.md',
  ]

  const allFrontMatter = []

  files.forEach((file: string) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }

    const source = fs.readFileSync(file, 'utf8')
    const { data: frontmatter } = matter(source)
    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : null,
      })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
