import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  toggle: () => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

type LatestMessagesState = {
  preHeaders: Record<string, string>;
  addPreHeader: (groupId: string, message: string) => void;
};

export const useLatestMessages = create<LatestMessagesState>((set) => ({
  preHeaders: {},
  addPreHeader: (groupId, message) =>
    set((state) => ({
      preHeaders: {
        ...state.preHeaders,
        [groupId]: message,
      },
    })),
}));
