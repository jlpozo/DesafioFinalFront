import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState("");
    const [token, setToken] = useState(false); 
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, isAdmin, setIsAdmin}}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;