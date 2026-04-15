import { create } from "zustand";

type SidebarStore = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (value: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isSidebarOpen: true,

  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),

  setSidebarOpen: (value) =>
    set({
      isSidebarOpen: value,
    }),
}));
