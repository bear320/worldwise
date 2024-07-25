import { createContext, useReducer } from "react";
import { AuthContextType, AuthStateType, AuthActionType } from "../types/auth";

const AuthContext = createContext({} as AuthContextType);

const initialState: AuthStateType = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state: AuthStateType, action: AuthActionType): AuthStateType => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("Unknown action type");
  }
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState);

  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
