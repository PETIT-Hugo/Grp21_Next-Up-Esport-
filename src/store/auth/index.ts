// store/auth/index.ts
import { reactive, computed, watch } from 'vue'

interface AuthState {
  userId: string | null
  upcoins: number | null
}

const state = reactive<AuthState>({
  userId: localStorage.getItem('userId'),
  upcoins: localStorage.getItem('upcoins') ? Number(localStorage.getItem('upcoins')) : null
})

watch(
  () => state.userId,
  (newUserId) => {
    if (newUserId) {
      localStorage.setItem('userId', newUserId)
    } else {
      localStorage.removeItem('userId')
      localStorage.removeItem('upcoins')
    }
  }
)

watch(
  () => state.upcoins,
  (newUpcoins) => {
    if (newUpcoins !== null) {
      localStorage.setItem('upcoins', newUpcoins.toString())
    } else {
      localStorage.removeItem('upcoins')
    }
  }
)

export const useAuthStore = () => {
  const setCurrentUserId = (userId: string) => {
    state.userId = userId
  }

  const getCurrentUserId = computed(() => state.userId)

  const setUpcoins = (upcoins: number) => {
    state.upcoins = upcoins
  }

  const getUpcoins = computed(() => state.upcoins)

  return {
    setCurrentUserId,
    getCurrentUserId,
    setUpcoins,
    getUpcoins
  }
}
