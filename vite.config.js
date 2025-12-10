import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
  server: {
    host: '127.0.0.1', // Paksa menggunakan IPv4 agar cocok dengan wait-on di CI
    port: 5173, // Pastikan port selalu 5173  
  }             
})
