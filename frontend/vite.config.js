import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using PostCSS for Tailwind 4 as a more stable alternative in this environment
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
