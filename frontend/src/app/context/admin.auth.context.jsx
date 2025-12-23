import { createContext, useEffect, useState } from "react";

export const AdminAuthContext = createContext(null);

export const AdminAuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    admin: {
      email: "",
      name: "",
      role: "",
    },
  });

  const [appLoading, setAppLoading] = useState(true);

  // ===== INIT AUTH FROM LOCAL STORAGE =====
  useEffect(() => {
    const token = localStorage.getItem("admin_access_token");
    const email = localStorage.getItem("admin_email");
    const name = localStorage.getItem("admin_name");
    const role = localStorage.getItem("admin_role");

    if (token && role === "admin") {
      setAuth({
        isAuthenticated: true,
        admin: {
          email: email || "",
          name: name || "",
          role: "admin",
        },
      });
    }

    setAppLoading(false);
  }, []);

  // ===== LOGOUT =====
  const logout = () => {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_email");
    localStorage.removeItem("admin_name");
    localStorage.removeItem("admin_role");

    setAuth({
      isAuthenticated: false,
      admin: {
        email: "",
        name: "",
        role: "",
      },
    });
  };

  return (
    <AdminAuthContext.Provider
      value={{
        auth,
        setAuth,
        logout,
        appLoading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
