import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import useFetch from "../hooks/useFetch";
import { appRoutes } from "../constant";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { fetchData } = useFetch();
  const [currentUser, setCurrentUser] = useState(null);

  const updateUserState = async (token) => {
    console.log("token", appRoutes.getCurrentUser);
    const response = await fetchData({
      url: appRoutes.getCurrentUser,
      method: "post",
      body: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response", response);
    setCurrentUser(response.data);
  };
  useEffect(() => {
    const token = Cookies.get("currentUser");
    if (token) {
      updateUserState(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser: updateUserState }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
