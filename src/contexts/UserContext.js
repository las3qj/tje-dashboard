import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [role, setRole] = useState("none");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [id, setID] = useState();
  const [userReload, forceUserReload] = useState("false");
  useEffect(() => {
    if (!user) {
      setRole("none");
    } else {
      fetch("http://localhost:8000/user?uid=" + user.uid)
        .then((res) => res.json())
        .then((res) => {
          setRole(res.role);
          setFirstName(res.firstName);
          setLastName(res.lastName);
          setID(res.id);
          forceUserReload(false);
        });
    }
  }, [user, userReload]);

  const isLoggedIn = user ? true : false;
  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        role,
        id,
        firstName,
        lastName,
        forceUserReload,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
