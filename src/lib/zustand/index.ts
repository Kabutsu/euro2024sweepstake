import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  toggle: () => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

type ModalState = {
  isOpen: boolean;
  children: React.ReactNode;
  open: (children: React.ReactNode) => void;
  close: () => void;
};

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  children: null,
  open: (children) => set({ isOpen: true, children }),
  close: () => set({ isOpen: false }),
}));

type GroupUserFetchingState = {
  isLoading: Record<string, boolean>;
  setIsUserGroupFetching: (groupId: string, value: boolean) => void;
};

export const useGroupUserFetching = create<GroupUserFetchingState>((set) => ({
  isLoading: {},
  setIsUserGroupFetching: (groupId, value) =>
    set((state) => ({
      isLoading: {
        ...state.isLoading,
        [groupId]: value,
      },
    })),
}));
