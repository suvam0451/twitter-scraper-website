import SearchBar from './elements/searchBar'

const TwitterAccountSearch = () => {
  const onSearch = (q: string) => {
    console.log(q)
  }

  const onSearchTextChanged = (q: string) => {
      console.log("debounced", q);
  }

  return (
    <>
      <SearchBar
        searchCallback={onSearch}
        loading={false}
        autoCompletionList={[]}
        recommendationsLimit={5}
        handleSearchTextChange={onSearchTextChanged}
      />
    </>
  )
}

export default TwitterAccountSearch
