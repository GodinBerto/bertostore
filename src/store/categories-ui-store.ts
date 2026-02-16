import { create } from "zustand";

interface CategoriesUiState {
  isMobileCategoriesOpen: boolean;
  isDesktopHeroCategoriesOpen: boolean;
  openMobileCategories: () => void;
  toggleMobileCategories: () => void;
  closeMobileCategories: () => void;
  openDesktopHeroCategories: () => void;
  toggleDesktopHeroCategories: () => void;
  closeDesktopHeroCategories: () => void;
}

export const useCategoriesUiStore = create<CategoriesUiState>((set) => ({
  isMobileCategoriesOpen: false,
  isDesktopHeroCategoriesOpen: true,
  openMobileCategories: () =>
    set(() => ({
      isMobileCategoriesOpen: true,
    })),
  toggleMobileCategories: () =>
    set((state) => ({
      isMobileCategoriesOpen: !state.isMobileCategoriesOpen,
    })),
  closeMobileCategories: () =>
    set(() => ({
      isMobileCategoriesOpen: false,
    })),
  openDesktopHeroCategories: () =>
    set(() => ({
      isDesktopHeroCategoriesOpen: true,
    })),
  toggleDesktopHeroCategories: () =>
    set((state) => ({
      isDesktopHeroCategoriesOpen: !state.isDesktopHeroCategoriesOpen,
    })),
  closeDesktopHeroCategories: () =>
    set(() => ({
      isDesktopHeroCategoriesOpen: false,
    })),
}));
