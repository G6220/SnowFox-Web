import { Login, Register } from '@/api/admin/auth'
import { decodeJWT } from '@/utils/jwt'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  let token = localStorage.getItem('token')
  const userInfo = computed(() => decodeJWT(token)?.data)
  const register = async (request: object) => {
    try {
      const res = await Register(request)
      const { success, data } = res?.data
      if (success) {
        token = data
        localStorage.setItem('token', token)
      }
    } catch (error) {
      throw error
    }
  }
  const login = async (request: object) => {
    try {
      const res = await Login(request)
      const { success, data } = res?.data
      if (success) {
        token = data
        localStorage.setItem('token', token)
      }
    } catch (error) {
      throw error
    }
  }
  return {
    token,
    userInfo,
    login,
    register,
  }
})
