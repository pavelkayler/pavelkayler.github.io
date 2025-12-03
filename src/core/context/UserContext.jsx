import { createContext, useMemo, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const [userStats, setUserStats] = useState({
    loginCount: 0,
    logoutCount: 0,
  });

  const login = (name) => {
    setIsAuth(true);
    setUserName(name || "Гость");
    setUserStats((prev) => ({
      ...prev,
      loginCount: prev.loginCount + 1,
    }));
  };

  const logout = () => {
    setIsAuth(false);
    setUserStats((prev) => ({
      ...prev,
      logoutCount: prev.logoutCount + 1,
    }));
  };

  const value = useMemo(
    () => ({
      isAuth,
      userName,
      userStats,
      login,
      logout,
    }),
    [isAuth, userName, userStats],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
