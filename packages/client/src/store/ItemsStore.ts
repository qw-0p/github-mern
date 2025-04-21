import { create } from "zustand"
import api from "../services/axios"
import { useAuthStore } from './AuthStore.ts';

interface Item {
  _id: string,
  owner: string,
  name: string,
  url: string,
  stars: number,
  forks: number,
  issues: number,
  createdAt: Date,
}

interface ItemsState {
  items: Item[]
  isLoading: boolean
  error: string | null
  fetchItems: () => Promise<void>
  addItem: (name: string) => Promise<void>
  deleteItem: (id: string) => Promise<void>
  clearError: () => void
}

export const useItemsStore = create<ItemsState>((set) => ({
  items: [],
  isLoading: false,
  error: null,
  editingItem: null,

  fetchItems: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get("/")
      set({ items: response.data, isLoading: false })
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch items. Please try again.",
        isLoading: false,
      })
      console.error(err)
    }
  },

  addItem: async (name) => {
    const { user } = useAuthStore.getState()

    set({ error: null })
    try {
      const response = await api.post("/", {
        name,
        userId: user?.id
      })
      set((state) => ({ items: [response.data, ...state.items ] }))
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to add item. Please try again." })
      console.error(err)
    }
  },

  deleteItem: async (id) => {
    set({ error: null })
    try {
      await api.delete(`/${id}`)
      set((state) => ({
        items: state.items.filter((item) => item._id !== id),
      }))
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to delete item. Please try again." })
      console.error(err)
    }
  },

  clearError: () => {
    set({ error: null })
  },
}))
