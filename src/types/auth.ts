export type User = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export type AuthStateType = {
  user: User | null;
  isAuthenticated: boolean;
};

export type AuthActionType = { type: "login"; payload: User } | { type: "logout" };
