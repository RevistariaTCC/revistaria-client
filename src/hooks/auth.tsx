'use client'
import { useCallback, useState, createContext, useContext, ReactNode } from "react"

const AUTH_TOKEN_KEY = "@Revistaria:Token"
const AUTH_USER = "@Revistaria:user"

type LayoutProps = {children?: ReactNode}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  signIn(credentials: AuthState): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


const AuthProvider = ({ children }: LayoutProps) => {
  const [data, setData] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const user = localStorage.getItem(AUTH_USER);
  
      if (user && token) {
        return { token, user: JSON.parse(user) };
      }
    }


    return {} as AuthState;
  });
  const signIn = useCallback(async ({ token, user }: AuthState) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
    localStorage.setItem(AUTH_USER, JSON.stringify(user))
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER)
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};