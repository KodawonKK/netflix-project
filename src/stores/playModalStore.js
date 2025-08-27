import { create } from 'zustand';

export const usePlayModalStore = create(set => ({
  openModals: {},
  openModal: id =>
    set(state => ({ openModals: { ...state.openModals, [id]: true } })),
  closeModal: id =>
    set(state => ({ openModals: { ...state.openModals, [id]: false } })),
}));
