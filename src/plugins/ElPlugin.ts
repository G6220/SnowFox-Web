import type { App } from 'vue'
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'

export default {
  install(app: App) {
    app.config.globalProperties.$message = ElMessage
    app.config.globalProperties.$notify = ElNotification

    // 封装 $modal，默认返回 Promise
    app.config.globalProperties.$modal = {
      confirm: (message: string, title = '提示') =>
        ElMessageBox.confirm(message, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }),

      alert: (message: string, title = '提示') =>
        ElMessageBox.alert(message, title, {
          confirmButtonText: '确定',
        }),

      prompt: (message: string, title = '输入') =>
        ElMessageBox.prompt(message, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }),
    }
  },
}
