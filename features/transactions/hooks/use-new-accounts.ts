import { create } from 'zustand'

interface NewAccountState {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useNewAccounts = create<NewAccountState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
