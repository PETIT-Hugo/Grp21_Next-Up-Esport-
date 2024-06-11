import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import Pages from 'vite-plugin-pages'

import VueRouter from 'unplugin-vue-router/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VueRouter({}), vue(), VueDevTools(), Pages()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/proxy': {
        target: 'https://europe.api.riotgames.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, '')
      }
    }
  }
  // // décommenter pour build en mode production directement dans pocketbase
  // ,
  // build: {
  //   outDir: './pocketbase/pb_public'
  // }
})
