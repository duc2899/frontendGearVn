import React, { createContext, useEffect } from "react";
import { useState } from "react";
import GetCookie from "../../Utils/Cookie/GetCookie";
import { checkTokenService } from "../../Services/AccountServices/CheckTokenService";
import { getInforUserService } from "../../Services/AccountServices/GetInforUserService";
import DeleteCookie from "../../Utils/Cookie/DeleteCookie";
export const UserContext = createContext(null);
const AccountUserContext = ({ children }) => {
  const [reload, setReload] = useState(false);
  const [userAccount, setUserAccount] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const value = { userAccount, setUserAccount, isLogin, setIsLogin, setReload };
  useEffect(() => {
    if (GetCookie("user") || reload) {
      const fetchAPICheckToken = async () => {
        const fetchAPIGetUser = async () => {
          const res = await getInforUserService({
            email: GetCookie("user").email,
          });
          setUserAccount(res.data);
          setIsLogin(true);
        };
        fetchAPIGetUser();
      };
      fetchAPICheckToken();
      setReload(false);
    } else {
      setIsLogin(false);
    }
  }, [reload]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default AccountUserContext;
