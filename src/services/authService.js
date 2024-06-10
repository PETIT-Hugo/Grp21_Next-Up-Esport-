import { useAuthStore } from '@/store/auth'

export const login = async (credentials) => {
  const response = await api.login(credentials)
  if (response.success) {
    useAuthStore().setCurrentUserId(response.userId)
  }
  return response
}

export const logout = () => {
  useAuthStore().setCurrentUserId(null)
  // Autres actions de déconnexion si nécessaire, comme appeler une API de déconnexion
}
