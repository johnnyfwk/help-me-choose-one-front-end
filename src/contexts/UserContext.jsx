import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userLoggedIn, setUserLoggedIn] = useState({})

    return (
        <UserContext.Provider value={{userLoggedIn, setUserLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}