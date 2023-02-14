import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [vue(), mkcert()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    https: true,
  }

  // module.exports = {
  //   devServer: {
  //     open: process.platform === 'darwin',
  //     host: '127.0.0.0',
  //     port: 5173, // CHANGE YOUR PORT HERE!
  //     https: true,
  //     hotOnly: false,
  //   },
  // }
})
