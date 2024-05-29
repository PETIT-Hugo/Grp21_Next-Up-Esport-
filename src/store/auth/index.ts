import { reactive } from 'vue'

interface AuthState {
  userId: string | null
}

const state = reactive<AuthState>({
  userId: null
})

export const useAuthStore = () => {
  const setCurrentUserId = (userId: string) => {
    state.userId = userId
  }

  const getCurrentUserId = () => state.userId

  return {
    setCurrentUserId,
    getCurrentUserId
  }
}
