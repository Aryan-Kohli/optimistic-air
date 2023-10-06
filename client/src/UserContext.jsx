import React from "react";
import { createContext } from "react";
import axios from "axios";
export const UserContext = createContext(null);
export function UserContextProvider({ children }) {
  const [user, setuser] = React.useState(null);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setuser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setuser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
