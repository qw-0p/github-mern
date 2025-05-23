import { create } from "zustand"
import { persist } from "zustand/middleware"
import api from "../services/axios"

interface User {
  _id: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  refreshToken: () => Promise<string | null>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (email: string, password: string) => {
          const response = await api.post("/auth/login", { email, password })
          const { accessToken, refreshToken, user } = response.data



          localStorage.setItem("accessToken", accessToken)
          localStorage.setItem("refreshToken", refreshToken)

          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

          set({ user, isAuthenticated: true })
      },

      register: async (email: string, password: string) => {
          const response = await api.post("/auth/signup", { email, password })
          const { accessToken, refreshToken, user } = response.data

          localStorage.setItem("accessToken", accessToken)
          localStorage.setItem("refreshToken", refreshToken)

          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

          set({ user, isAuthenticated: true })
      },

      logout: () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        api.defaults.headers.common["Authorization"] = ""
        set({ user: null, isAuthenticated: false })
      },

      checkAuth: async () => {
        set({ isLoading: true })
        const token = localStorage.getItem("accessToken")

        if (token) {
          try {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`
            const response = await api.get("/auth/me")
            set({ user: response.data, isAuthenticated: true })

          } catch (error) {
            try {
              await get().refreshToken()
            } catch (refreshError) {
              localStorage.removeItem("accessToken")
              localStorage.removeItem("refreshToken")
              api.defaults.headers.common["Authorization"] = ""
              set({ user: null, isAuthenticated: false })
            }
          }
        }

        set({ isLoading: false })
      },

      refreshToken: async () => {
        const refreshToken = localStorage.getItem("refreshToken")

        if (!refreshToken) {
          throw new Error("No refresh token available")
        }

          const response = await api.post("/auth/refresh", { refreshToken })
          const { accessToken, newRefreshToken } = response.data

          localStorage.setItem("accessToken", accessToken)
          localStorage.setItem("refreshToken", newRefreshToken)

          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

          const userResponse = await api.get("/auth/me")
          set({ user: userResponse.data, isAuthenticated: true })

          return accessToken
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const accessToken = await useAuthStore.getState().refreshToken()

        if (accessToken) {
          return api(originalRequest)
        }
      } catch (refreshError) {
        useAuthStore.getState().logout()
      }
    }

    return Promise.reject(error)
  },
)
