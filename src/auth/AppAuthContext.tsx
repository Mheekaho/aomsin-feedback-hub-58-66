import React, { createContext, useContext, useEffect, useState } from "react";

export type User = {
  username: string;
  displayName: string;
  role: "hr" | "admin";
  isAdmin: boolean;
};

type AuthState = {
  currentUser?: User;
  loading: boolean;
};

type AuthActions = {
  signIn: (user: User) => void;
  signOut: () => void;
};

const AppAuthContext = createContext<AuthState & AuthActions>({
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

const STORAGE_KEY = "app.auth";

export const AppAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ loading: true });

  useEffect(() => {
    // Hydrate from localStorage on mount
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const currentUser = JSON.parse(stored) as User;
        setState({ loading: false, currentUser });
      } else {
        setState({ loading: false });
      }
    } catch (error) {
      console.error("Failed to parse auth data:", error);
      setState({ loading: false });
    }
  }, []);

  const signIn = (user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setState({ loading: false, currentUser: user });
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ loading: false, currentUser: undefined });
  };

  return (
    <AppAuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  );
};

export const useAuth = () => useContext(AppAuthContext);