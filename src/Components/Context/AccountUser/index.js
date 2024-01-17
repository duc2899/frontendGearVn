import React, { createContext, useEffect } from "react";
import { useState } from "react";
import GetCookie from "../../Utils/Cookie/GetCookie";
import { checkTokenService } from "../../Services/AccountServices/CheckTokenService";
import { getInforUserService } from "../../Services/AccountServices/GetInforUserService";
import DeleteCookie from "../../Utils/Cookie/DeleteCookie";
export const UserContext = createContext(null);
const AccountUserContext = ({ children }) => {
  const [userAccount, setUserAccount] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const value = { userAccount, setUserAccount, isLogin, setIsLogin };
  useEffect(() => {
    if (GetCookie("user")) {
      const fetchAPICheckToken = async () => {
        const result = await checkTokenService({
          token: GetCookie("user").token,
        });

        if (result.status === 200) {
          const fetchAPIGetUser = async () => {
            const res = await getInforUserService({
              email: GetCookie("user").email,
            });
            setUserAccount(res.data);
            setIsLogin(true);
          };
          fetchAPIGetUser();
        } else {
          setIsLogin(false);
          DeleteCookie("user");
        }
      };
      fetchAPICheckToken();
    } else {
      setIsLogin(false);
    }
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default AccountUserContext;
