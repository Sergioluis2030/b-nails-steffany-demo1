import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()], base: '/b-nails-steffany-demo1/', server: { port: 5173 } })
