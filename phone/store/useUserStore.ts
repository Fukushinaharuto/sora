import { create } from 'zustand';

type User = {
  id: number;
  name: string;
  email: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
