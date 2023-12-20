import React, { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext(null);
const AccountUserContext = ({ children }) => {
  const [userAccount, setUserAccount] = useState({
    userName: "Bui duc",
  });
  const value = { userAccount, setUserAccount };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default AccountUserContext;
