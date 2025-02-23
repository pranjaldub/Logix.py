import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    {
      name: 'configure-server',
      configureServer(server) {
        server.middlewares.use('/health', (req, res) => {
          res.statusCode = 200
          res.end('OK')
        })
      }
    }
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss()
      ]
    }
  },
  preview: {
    port: 5173,
    strictPort: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },
  server: {
    hmr: {
      overlay: true
    },
    port: 5173,
    strictPort: true,
    host: true,
    fs: {
      strict: true,
      watch: {
        interval: 500,
        usePolling: false,
      }
    },
    watch: {
      ignored: ['**/node_modules/**', '**/static/**', '**/dist/**']
    }
  }
});