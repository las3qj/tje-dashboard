import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [role, setRole] = useState("none");
  const [userReload, forceUserReload] = useState("false")
  useEffect(() => {
    if (!user) {
      setRole("none");
    } else {
      fetch("http://localhost:8000/user?uid=" + user.uid)
        .then((res) => res.json())
        .then((res) => {
          setRole(res.role);
          forceUserReload(false)
        });
    }
  }, [user, setRole, userReload]);

  const isLoggedIn = user ? true : false;
  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, role, forceUserReload }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
