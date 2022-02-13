export const formatDisplayedUsername = (query: string) => {
  if (query.length > 10) {
    return query.slice(0, 8) + '...'
  }
  return query
}
