import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Use the built-in fast minifier
    minify: 'esbuild',

    // Remove console + debugger in production
    esbuild: {
      drop: ['console', 'debugger'],
    },

    // Code-splitting for better caching + smaller initial load
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'lucide-react': ['lucide-react'],
          'axios': ['axios'],
          'react-scroll': ['react-scroll'],
        },
      },
    },

    // Increase warning limit (optional)
    chunkSizeWarningLimit: 600,
  },

  // Speed up dev + build
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
