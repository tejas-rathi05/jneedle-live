import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: any;
  authStatus: boolean;
  setUser: (user: AuthState["user"]) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      authStatus: false,
      setUser: (user) =>
        set({
          user,
          authStatus: !!user,
        }),
      logout: () =>
        set({
          user: null,
          authStatus: false,
        }),
    }),
    {
      name: "auth-storage", // Key for localStorage
    }
  )
);
