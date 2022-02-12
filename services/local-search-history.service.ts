export const setSearchHistory = (storeName: string, newEntry: string) => {
  const initial = localStorage.getItem(storeName)
  if (!initial) {
    localStorage.setItem(storeName, JSON.stringify([newEntry]))
    return
  }
  const arr: string[] = JSON.parse(initial)
  arr.push(newEntry)
  localStorage.setItem(storeName, JSON.stringify(arr))
  return 0
}

export const getSearchHistory = (storeName: string, query: string) => {
  const initial = getItem<string[]>(storeName)
  const arr = initial?.filter((ele) => ele.includes(query))
  return arr ? arr : []
}

export const getItem = <T>(storeName: string) => {
  const initial = localStorage.getItem(storeName)
  if (!initial) return undefined
  const arr: T = JSON.parse(initial)
  return arr
}
