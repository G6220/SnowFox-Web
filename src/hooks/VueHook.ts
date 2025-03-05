import { getCurrentInstance, type ComponentInternalInstance } from 'vue'

export function useProxy() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  return appContext.config.globalProperties
}
