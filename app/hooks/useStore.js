import create from 'zustand';

const useStore = create((set) => ({
  user: null,
  hasLaunched: false,
  outlets: [],
  categories: [],
  regions: [],
  features: [],
  setUser: (user) => set({ user }),
  setHasLaunched: (hasLaunched) => set({ hasLaunched }),
  setData: (outlets, categories, regions, features) =>
    set({ outlets, categories, regions, features }),
}));

export default useStore;
