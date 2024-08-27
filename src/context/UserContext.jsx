import { useState, createContext, useEffect } from 'react'

export const UserContext = createContext(null)

export default function UserContextProvider({ children }) {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setUserData(localStorage.getItem('userToken'))
        } 
    }, [])
    
    return <UserContext.Provider value={{userData, setUserData}}>
        {children}
    </UserContext.Provider>
}