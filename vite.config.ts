import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  envPrefix: 'APP_',
  server: {
    port: 8080,
    proxy: {
      '/api/Admin/': {
        target: 'http://localhost:9000',
        changeOrigin: true,
      },
    },
  },
})
