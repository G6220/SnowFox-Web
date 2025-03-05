import axios, { type AxiosInstance } from 'axios'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

// 创建 Axios 实例工厂
const createHttpInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL, // 默认 baseURL
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  })

  // 请求拦截器
  instance.interceptors.request.use(
    function (config) {
      const userStore = useUserStore()
      if (userStore.token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${userStore.token}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  // 响应拦截器
  instance.interceptors.response.use(
    function (response) {
      const { success, code, message } = response.data
      if (!success && code) {
        ElMessage.error(message)
      }
      return response
    },
    function (error) {
      ElMessage.error(error.response?.message || '请求失败')
      return Promise.reject(error)
    },
  )

  return instance
}

// 创建全局请求方法
const request = () => {
  const baseURL = import.meta.env.APP_BASE_URL
  const instance = createHttpInstance(baseURL)

  return {
    get: <T = never>(url: string, params?: object) => instance.get<T>(url, { params }),

    post: <T = never>(url: string, data?: object) => instance.post<T>(url, data),

    put: <T = never>(url: string, data?: object) => instance.put<T>(url, data),

    delete: <T = never>(url: string, params?: object) => instance.delete<T>(url, { params }),
  }
}

// 导出一个默认 API 工具，支持动态传入 `baseURL`
export default request
