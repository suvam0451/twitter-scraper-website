import fs from 'fs'
import path from 'path'

const pipe =
  (...fns: any) =>
  (x: any) =>
    fns.reduce((v: any, f: any) => f(v), x)

const flattenArray = (input: any[]) =>
  input.reduce(
    (acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])],
    []
  )

const map = (fn: any) => (input: any) => input.map(fn)

export default function getAllFilesRecursively(folder: string) {
  return [
    '/Users/suvam/Documents/Repos/Github/twitter-scraper-website/data/blog/hello-world.md',
  ]
  // const est = pipe(
  //   fs.readdirSync,
  //   map(pipe(pathJoinPrefix(folder), walkDir)),
  //   flattenArray
  // )(folder)

  // console.log(est)
  // return est
}

const walkDir = (fullPath: string) => {
  return fs.statSync(fullPath).isFile()
    ? fullPath
    : getAllFilesRecursively(fullPath)
}

const pathJoinPrefix = (prefix: any) => (extraPath: any) =>
  path.join(prefix, extraPath)

// export default getAllFilesRecursively

export const getFilesInDir = (path: string) => {
  return [
    '/Users/suvam/Documents/Repos/Github/twitter-scraper-website/data/blog/hello-world.md',
  ]
}
