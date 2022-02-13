/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import NextImage from 'next/image'

// const Image = ({ ...rest }: any) => <NextImage {...rest} />

export const MDXComponents = {
  Image: ({ ...rest }: any) => <NextImage {...rest} />,
  wrapper: ({ components, layout, ...rest }: any) => {
    const Layout = require(`../../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: any) => {
  console.log(layout)
  console.log(mdxSource)
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])

  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
