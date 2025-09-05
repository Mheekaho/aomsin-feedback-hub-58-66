import React, { createContext, useContext, useEffect, useState } from "react";

type Role = "admin" | "user" | null;

type AuthState = {
  loading: boolean;
  isAuthenticated: boolean;
  role: Role;
};

const AuthCtx = createContext<AuthState>({ loading: true, isAuthenticated: false, role: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ loading: true, isAuthenticated: false, role: null });

  useEffect(() => {
    // ตัวอย่าง: อ่านจาก localStorage / หรือ decode JWT จริงในโปรเจกต์คุณ
    // localStorage.setItem("session", JSON.stringify({ role: "admin", token: "..." }))
    const raw = localStorage.getItem("session");
    if (raw) {
      try {
        const s = JSON.parse(raw);
        setState({ loading: false, isAuthenticated: true, role: (s.role as Role) ?? null });
      } catch {
        setState({ loading: false, isAuthenticated: false, role: null });
      }
    } else {
      setState({ loading: false, isAuthenticated: false, role: null });
    }
  }, []);

  return <AuthCtx.Provider value={state}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => useContext(AuthCtx);
