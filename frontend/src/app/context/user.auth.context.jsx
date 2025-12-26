import { createContext, useEffect, useState } from "react";

export const UserAuthContext = createContext(null);

const EMPTY_USER = {
  _id: "",
  email: "",
  fullName: "",
  role: "user",
  image: null,
};

export const UserAuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: EMPTY_USER,
  });

  const [appLoading, setAppLoading] = useState(true);

  // ===== INIT AUTH FROM LOCAL STORAGE =====
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");

    if (!token || role !== "user") {
      setAuth({
        isAuthenticated: false,
        user: EMPTY_USER,
      });
      setAppLoading(false);
      return;
    }

    const userId = localStorage.getItem("user_id");
    const email = localStorage.getItem("user_email");
    const fullName = localStorage.getItem("user_fullName");
    const imageStr = localStorage.getItem("user_image");

    let image = null;
    if (imageStr && imageStr !== "undefined") {
      try {
        image = JSON.parse(imageStr);
      } catch {
        image = null;
      }
    }

    setAuth({
      isAuthenticated: true,
      user: {
        _id: userId || "",
        email: email || "",
        fullName: fullName || "",
        role: "user",
        image,
      },
    });

    setAppLoading(false);
  }, []);

  // ===== LOGOUT =====
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_fullName");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_image");

    setAuth({
      isAuthenticated: false,
      user: EMPTY_USER,
    });
  };

  return (
    <UserAuthContext.Provider
      value={{
        auth,
        setAuth,
        logout,
        appLoading,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
