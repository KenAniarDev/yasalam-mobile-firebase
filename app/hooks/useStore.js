import create from 'zustand';

const useStore = create((set) => ({
  user: null,
  hasLaunched: false,
  outlets: [],
  categories: [],
  regions: [],
  features: [],
  member: null,
  favorites: [],
  setUser: (user) => set({ user }),
  setHasLaunched: (hasLaunched) => set({ hasLaunched }),
  setMember: (member) => set({ member }),
  setOutlets: (outlets) => set({ outlets }),
  setData: (outlets, categories, regions, features) =>
    set({ outlets, categories, regions, features }),
}));

export default useStore;
