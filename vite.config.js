import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default {
    build: {
      minify: false,  // Disable minification if not necessary
      cssCodeSplit: true,  // Split CSS to prevent large chunks
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
  }
  