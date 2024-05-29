import { reactive, computed, watch } from 'vue'

interface AuthState {
  userId: string | null
}

const state = reactive<AuthState>({
  userId: localStorage.getItem('userId')
})

watch(() => state.userId, (newUserId) => {
  if (newUserId) {
    localStorage.setItem('userId', newUserId)
  } else {
    localStorage.removeItem('userId')
  }
})

export const useAuthStore = () => {
  const setCurrentUserId = (userId: string) => {
    state.userId = userId
  }

  const getCurrentUserId = computed(() => state.userId)

  return {
    setCurrentUserId,
    getCurrentUserId
  }
}