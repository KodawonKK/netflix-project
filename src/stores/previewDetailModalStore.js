import { create } from 'zustand';

export const usePreviewDetailModalStore = create(set => ({
  isDetailModalOpen: {},
  openDetailModal: id =>
    set(state => ({
      isDetailModalOpen: { ...state.isDetailModalOpen, [id]: true },
    })),
  closeDetailModal: id =>
    set(state => ({
      isDetailModalOpen: { ...state.isDetailModalOpen, [id]: false },
    })),
}));
