import { create } from 'zustand';

export const usePlayModalStore = create(set => ({
  isPlayOpen: false,
  openModal: () => set({ isPlayOpen: true }),
  closeModal: () => set({ isPlayOpen: false }),
}));
