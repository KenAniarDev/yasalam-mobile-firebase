import create from 'zustand';

const useStore = create((set) => ({
  user: null,
  hasLaunched: false,
  setUser: (user) => set({ user }),
  setHasLaunched: (hasLaunched) => set({ hasLaunched }),
}));

export default useStore;
