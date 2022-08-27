import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

export type AccountDTO = {
  id: number,
  name: string,
  username: string
}


const TwitterContext = createContext<{
  accountList: AccountDTO[],
  setAccountList: Dispatch<SetStateAction<any[]>>,
  addAccount: (payload: AccountDTO) => void,
  removeAccount: (id: number) => void
}>({} as any)

export function useTwitterContext() {
  return useContext(TwitterContext)
}


export default function TwitterProvider({ children }) {
  const [accountList, setAccountList] = useState<AccountDTO[]>([])

  function addAccount(payload: AccountDTO) {
    console.log("payload", payload)
    let index = accountList.findIndex(o => o.id === payload.id)
    if (index === -1) {
      console.log("adding value", payload, accountList)
      console.log("new value", [...accountList, payload])
      setAccountList([...accountList, payload])
    }
    console.log("new list is", accountList)
  }

  function removeAccount(id: number) {
    let index = accountList.findIndex(o => o.id === id)
    if (index !== -1) {
      setAccountList(accountList.splice(index, 1))
    }
  }

  return <TwitterContext.Provider value={{ accountList, setAccountList, addAccount, removeAccount }}>
    {children}
  </TwitterContext.Provider>
}