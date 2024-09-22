"use client"

import { GlobalProvider } from "../context/globalProvider"

interface Props{
    children: React.ReactNode
}

function ContextProvider({children} :Props){
    return <GlobalProvider>{children}</GlobalProvider>
}
 export default ContextProvider;