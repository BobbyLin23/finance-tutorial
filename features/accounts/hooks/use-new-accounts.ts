import { create } from 'zustand'

type NewAccountsState = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useNewAccounts = create<NewAccountsState>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
