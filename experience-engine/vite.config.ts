import { defineConfig } from 'vite'
import { resolve } from 'path'

const PORT = parseInt(process.env.PORT || '5173', 10)
const BASE_PATH = process.env.BASE_PATH || '/'

export default defineConfig({
  base: BASE_PATH,
  server: {
    port: PORT,
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
