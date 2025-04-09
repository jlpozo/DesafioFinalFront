import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: "test@desafiolatam.com",
        displayName: "Desafío Latam",
        isAdmin: false,
      });
    const [token, setToken] = useState(false); //Quedará como loggeado por defecto al refrescar, esto impide validar la ruta protegida de login
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, isAdmin, setIsAdmin}}>
            {children}
        </UserContext.Provider>
    );
};
export default UserProvider;