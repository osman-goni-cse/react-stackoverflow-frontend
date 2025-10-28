import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const refreshUser = async () => {
    try {
      const res = await fetch("http://localhost:5192/api/auth/me", { credentials: "include" });
      const data = await res.json();
      if (data.isLoggedIn) setUser(data.userInfo);
      else setUser(null);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
