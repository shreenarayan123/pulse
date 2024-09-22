"use client"


import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

interface GlobalContextProps {
  isSideBar: boolean;
}

const GlobalContext = createContext<GlobalContextProps>({ isSideBar: false });
const GlobalUpdateContext = createContext<Dispatch<SetStateAction<boolean>>>((() => {}) as Dispatch<SetStateAction<boolean>>);

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalUpdateContext = () => useContext(GlobalUpdateContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSideBar, setIsSideBar] = useState(false);

    return (
        <GlobalContext.Provider value={{ isSideBar }}>
            <GlobalUpdateContext.Provider value={setIsSideBar}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        