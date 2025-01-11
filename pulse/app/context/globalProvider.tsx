"use client"


import { createContext, useState, Dispatch, SetStateAction, useContext } from 'react';

interface GlobalContextProps {
  isSideBar: boolean;
    TaskFormModal: boolean;
    setTaskFormModal: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextProps>({ isSideBar: false , TaskFormModal: false, setTaskFormModal: (() => {})  });
const GlobalUpdateContext = createContext<Dispatch<SetStateAction<boolean>>>((() => {}) as Dispatch<SetStateAction<boolean>>);

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalUpdateContext = () => useContext(GlobalUpdateContext);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSideBar, setIsSideBar] = useState(false);
    const [TaskFormModal, setTaskFormModal] = useState(false);  

    return (
        <GlobalContext.Provider value={{ isSideBar, TaskFormModal, setTaskFormModal }}>
            <GlobalUpdateContext.Provider value={setIsSideBar} >
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        